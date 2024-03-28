<script lang="ts">
  import Dialog from '$components/Dialog.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputFile from '$components/InputFile.svelte';
  import Button from '$components/Button.svelte';
  import Form from '$components/Form.svelte';
  import TableMeta from '$components/TableMeta.svelte';
  import H4 from '$components/H4.svelte';
  import Link from '$components/Link.svelte';
  import { onMount } from 'svelte';
  import { TABLE_METADATA_HEADER } from '$config';
  import {
    Endpoint,
    QueryType,
    FormOrientation,
    type ApiResponse,
    type ApiFingerprintData,
    type TableFingerprintData,
    type ApiIndicatorsData
  } from '$models';
  import { queryApi } from '$api';
  import { loadingStore } from '$stores/loading.ts';
  import { metadataStore } from '$stores/apiData.ts';
  import { metadataFormDataStore } from '$stores/input.ts';

  let metadataFormData = $metadataFormDataStore;

  export let data;

  async function handleSubmit(event: Event, query: { type: QueryType; endpoint: Endpoint }) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    if (query.endpoint === Endpoint.Fingerprint && !formData.has('run_urlscan')) {
      formData.set('run_urlscan', '0');
    }

    let response: ApiResponse<ApiFingerprintData> = await queryApi(
      query.type,
      query.endpoint,
      formData
    );

    if (response.error) {
      console.log(response.error);
    } else {
      if (response.data) {
        console.log(response.data);
        metadataStore.set(response.data as ApiFingerprintData);
        loadingStore.set(false);
      }
    }
  }

  $: tableData = $metadataStore
    ? {
        indicators: $metadataStore.indicators,
        matches: $metadataStore.matches,
        indicator_metadata: $metadataStore.indicator_metadata
      }
    : null;
</script>

<div class="grid w-full flex-grow grid-cols-1 bg-gray4 md:grid-cols-12 dark:bg-gray7">
  <section class="col-span-3 w-full border-r-[1px] border-gray5 bg-gray7 px-3">
    {#if data.metadataAdvancedFormConfig}
      <Form
        config={data.metadataAdvancedFormConfig}
        onSubmit={handleSubmit}
        orientation={FormOrientation.Vertical}
      />
    {/if}
  </section>
  <!--
    <Dialog let:C>
      <C.Trigger>Batch parse</C.Trigger>
      <C.Portal>
        <C.Overlay />
        <C.Content>
          <C.Title>Batch Download</C.Title>
          <C.Description>Batch Parse description</C.Description>
          <div class="flex flex-col items-start gap-1 pb-11 pt-7">
            <Label for="emailInput" class="text-sm font-medium">Email</Label>
            <InputText
              name="email input"
              id="emailInput"
              class=""
              placeholder="Your Email"
              type="email"
              autocomplete="off"
            />
            <InputFile onSubmit={(f) => console.log(f)} />
          </div>
          <div class="flex w-full justify-end">
            <C.Close>X</C.Close>
          </div>
        </C.Content>
      </C.Portal>
    </Dialog>

    <h2>Refine Result</h2>
    <Button on:click={() => {}} ariaLabel="Open select metadata modal">Filter Metadata</Button>
    <div>
      <Label for="filter_result">Filter Result</Label>
      <InputText name="filter result" id="filter_result"></InputText>
    </div>
    <Button on:click={() => {}} ariaLabel="Download result as csv">Download CSV</Button>
  </section>
  -->

  <section class="col-span-9 col-start-auto w-full border-t-[1px] border-gray5">
    <div>
      {#if metadataFormData?.has('url')}
        <span class="block py-2 text-xs dark:text-white">
          Results for: {metadataFormData.get('contentToSearch')}</span
        >
      {/if}
    </div>
    <div class="flexi w-full">
      {#if tableData}
        <TableMeta caption="" data={tableData} headerData={TABLE_METADATA_HEADER} />
      {:else}
        <div class="fence-pattern flex flex-1 items-center justify-center">
          <H4>No data</H4>
        </div>
      {/if}
    </div>
  </section>
</div>

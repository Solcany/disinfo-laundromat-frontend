<script lang="ts">
  import { onDestroy } from 'svelte';
  import { unsetLoading } from '$stores/loading.ts'; 
  import DownloadMetaResult from '$components/DownloadMetaResult.svelte';
  import Dialog from '$components/Dialog.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputFile from '$components/InputFile.svelte';
  import Button from '$components/Button.svelte';
  import Form from '$components/Form.svelte';
  import TableMeta from '$components/TableMeta.svelte';
  import H4 from '$components/H4.svelte';
  import Link from '$components/Link.svelte';
  import P from '$components/P.svelte';
  import Separator from '$components/Separator.svelte';
  import { TABLE_METADATA_HEADER } from '$config';
  import { FormOrientation, type TableMetaRowData } from '$models';
  import { handleApiSubmit } from '$form';
  import { metadataStore } from '$stores/apiData.ts';
  import { metadataFormDataStore } from '$stores/input.ts';

  // layout & page data
  export let data;

  // variable bound to TableMeta components's sorted data
  // used for exporting the Table data to files
  let tableData: TableMetaRowData[] = [];

  $: metadataSearchData = $metadataStore
    ? {
        indicators: $metadataStore.indicators,
        matches: $metadataStore.matches,
        indicator_metadata: $metadataStore.indicator_metadata
      }
    : null;
  onDestroy(() => {
    unsetLoading();
  })
</script>

<svelte:head>
  <meta name="title" content="Information Laundromat - Technical Similarity Search" />
</svelte:head>

<div class="grid w-full flex-grow grid-cols-1 bg-gray4 md:grid-cols-12 dark:bg-gray7">
  <section class="col-span-3 w-full border-r-[1px] border-gray5 bg-gray7 px-3">
    {#if data.metadataAdvancedFormConfig}
      <Form
        config={data.metadataAdvancedFormConfig}
        formData={$metadataFormDataStore}
        onSubmit={handleApiSubmit}
        orientation={FormOrientation.Vertical}
      />
    {/if}

    <Separator />
    <DownloadMetaResult data={tableData} />
    <Separator />

    <P
      ><Link href="/indicators">How to interpret results?</Link>
      <Link href="/indicators/#full-indicators-list">Need more information about indicators?</Link>
    </P>
    <P class="pb-6 pt-2">
      Need to analyse a bigger dataset? <Link href="https://github.com/pbenzoni">Contact Peter</Link
      > to see what’s possible</P
    >
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

  <section class="col-span-9 col-start-auto flex w-full flex-col border-t-[1px] border-gray5">
    <div>
      {#if $metadataFormDataStore?.has('url')}
        <span class="block border-b-[1px] border-gray5 py-2 pl-4 text-xs dark:text-white">
          Results for: {$metadataFormDataStore.get('url')}</span
        >
      {/if}
    </div>
    <div class="flex flex-1">
      {#if metadataSearchData}
        <TableMeta
          class="flex-1"
          data={metadataSearchData}
          bind:sortedRows={tableData}
          headerData={TABLE_METADATA_HEADER}
        />
      {:else}
        <div class="fence-pattern flex flex-1 items-center justify-center">
          <H4>No data</H4>
        </div>
      {/if}
    </div>
  </section>
</div>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { type ContentSearchResult } from '$api';
  import { unsetLoading } from '$stores/loading.ts';
  import { handleApiSubmit } from '$api';
  import { contentStore } from '$stores/apiData.ts';
  import { contentFormDataStore } from '$stores/input.ts';
  import DownloadResult from '$components/DownloadResult.svelte';
  import Dialog from '$components/Dialog.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputFile from '$components/InputFile.svelte';
  import Button from '$components/Button.svelte';
  import Form from '$components/Form.svelte';
  import TableContentSimilarity from '$components/TableContentSimilarity.svelte';
  import Link from '$components/Link.svelte';
  import Separator from '$components/Separator.svelte';
  import P from '$components/P.svelte';
  import H4 from '$components/H4.svelte';

  // layout & page data
  export let data;

  // variable bound to TableContent components's sorted data
  // used for exporting the Table data to files
  let tableData: ContentSearchResult[] = [];

  $: formConfig = data.contentAdvancedFormConfig;
  $: contentSearchData = $contentStore ? $contentStore.results : null;
  onDestroy(() => {
    unsetLoading();
  });
</script>

<div class="grid w-full flex-grow grid-cols-1 bg-gray4 md:grid-cols-12 dark:bg-gray7">
  <section class="col-span-3 w-full border-r-[1px] border-gray5 bg-gray7 px-3">
    {#if formConfig}
      <Form config={formConfig} formData={$contentFormDataStore} onSubmit={handleApiSubmit} />
    {/if}

    <Separator />
    <DownloadResult data={tableData} />
    <Separator />
    <P>
      Unsure where to start? <Link href="/#use-case-list">Explore the use cases</Link> or <Link
        href="/about/#how-to-use-the-laundromat">read the documentation</Link
      ></P
    >

    <P class="pb-6 pt-2">
      Need to analyse a bigger dataset? <Link href="https://github.com/pbenzoni">Contact Peter</Link
      > to see what’s possible</P
    >
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

    -->
  </section>
  <section class="col-span-9 col-start-auto flex w-full flex-col border-t-[1px] border-gray5">
    {#if $contentFormDataStore?.has('contentToSearch')}
      <div>
        <span class="block border-b-[1px] border-gray5 py-2 pl-2 text-xs dark:text-white">
          Results for: {$contentFormDataStore.get('contentToSearch')}</span
        >
      </div>
    {/if}

    <div class="flex flex-1">
      {#if contentSearchData}
        <TableContentSimilarity
          data={contentSearchData}
          bind:sortedData={tableData}
          class="flex-1"
        />
      {:else}
        <div class="fence-pattern flex flex-1 items-center justify-center">
          <H4>No data</H4>
        </div>
      {/if}
    </div>
  </section>
</div>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { unsetLoading } from '$stores/loading.ts';
  import { type TableRowTechnicalSimilarityData } from '$components/TableTechnicalSimilarity.svelte';
  import { TABLE_TECHNICAL_SIMILARITY_HEADER } from '$config';
  import { FormOrientation } from '$components/Form.svelte';
  import { handleApiSubmit } from '$api';
  import { technicalSimilarityStore } from '$stores/apiData.ts';
  import { technicalSimilarityFormDataStore } from '$stores/input.ts';
  import Dialog from '$components/Dialog.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputFile from '$components/InputFile.svelte';
  import Button from '$components/Button.svelte';
  import Form from '$components/Form.svelte';
  import TableTechnicalSimilarity from '$components/TableTechnicalSimilarity.svelte';
  import DownloadTechnicalSimilarityResult from '$components/DownloadTechnicalSimilarityResult.svelte';
  import H4 from '$components/H4.svelte';
  import Link from '$components/Link.svelte';
  import P from '$components/P.svelte';
  import Separator from '$components/Separator.svelte';

  // layout & page data
  export let data;

  // variable bound to TableMeta components's sorted data
  // used for exporting the Table data to files
  let tableData: TableRowTechnicalSimilarityData[] = [];

  $: formConfig = data.technicalSimilarityAdvancedFormConfig;
  $: technicalSimilarityData = $technicalSimilarityStore
    ? {
        indicators: $technicalSimilarityStore.indicators,
        matches: $technicalSimilarityStore.matches,
        indicator_metadata: $technicalSimilarityStore.indicator_metadata
      }
    : null;
  onDestroy(() => {
    unsetLoading();
  });
</script>

<svelte:head>
  <meta name="title" content="Information Laundromat - Technical Similarity Search" />
</svelte:head>

<div class="grid w-full flex-grow grid-cols-1 bg-gray4 md:grid-cols-12 dark:bg-gray7">
  <section class="col-span-3 w-full border-r-[1px] border-gray5 bg-gray7 px-3">
    {#if formConfig}
      <Form
        config={formConfig}
        formData={$technicalSimilarityFormDataStore}
        onSubmit={handleApiSubmit}
        orientation={FormOrientation.Vertical}
      />
    {/if}

    <Separator />
    <DownloadTechnicalSimilarityResult data={tableData} />
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
  <section class="col-span-9 col-start-auto flex w-full flex-col border-t-[1px] border-gray5">
    <div>
      {#if $technicalSimilarityFormDataStore?.has('url')}
        <span class="block border-b-[1px] border-gray5 py-2 pl-4 text-xs dark:text-white">
          Results for: {$technicalSimilarityFormDataStore.get('url')}</span
        >
      {/if}
    </div>
    <div class="flex flex-1">
      {#if technicalSimilarityData}
        <TableTechnicalSimilarity
          class="flex-1"
          data={technicalSimilarityData}
          bind:sortedRows={tableData}
          headerData={TABLE_TECHNICAL_SIMILARITY_HEADER}
        />
      {:else}
        <div class="fence-pattern flex flex-1 items-center justify-center">
          <H4>No data</H4>
        </div>
      {/if}
    </div>
  </section>
</div>

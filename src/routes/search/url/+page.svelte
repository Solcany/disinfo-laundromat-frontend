<script lang="ts">
  import Dialog from '$components/Dialog.svelte';
  import Combobox from '$components/Combobox.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputFile from '$components/InputFile.svelte';
  import Button from '$components/Button.svelte';
  import Form from '$components/Form.svelte';
  import Table from '$components/Table.svelte';
  import Link from '$components/Link.svelte';
  import { TABLE_CONTENT_HEADER } from '$config';
  import { Endpoint, QueryType, type ApiContentData, type ApiResponse } from '$models';
  import { queryApi } from '$api';
  import { loadingStore } from '$stores/loading.ts';
  import { urlContentStore } from '$stores/apiData.ts';
  import { inputStore } from '$stores/input.ts';
  export let data;

  // async function handleSubmit(event: Event) {
  //   event.preventDefault();
  //   loadingStore.set(true);
  //   const target = event.target as HTMLFormElement;
  //   const formData = new FormData(target);

  //   // WIP: backend parse-url endpoint requires combineOperator
  //   // which currently isn't it the UI
  //   // this is a workaround just to give the api everything it wants
  //   // should be figured out before app launch
  //   formData.set('combineOperator', 'OR');
  //   // !

  //   inputStore.set(formData);
  //   let response: ApiResponse<any> = await queryParseUrl(formData);
  //   if (response.error) {
  //     console.log(response.error);
  //   } else {
  //     let content = new Content(response.data as ResponseData);
  //     contentStore.set(content);
  //     loadingStore.set(false);
  //   }
  // }
  async function handleSubmit(event: Event, query: { type: QueryType; endpoint: Endpoint }) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    // a hack before this gets fixed on the backend
    if (query.endpoint == Endpoint.ParseUrl) {
      formData.set('combineOperator', 'OR');
    }

    console.log(formData);
    let response: ApiResponse<ApiContentData> = await queryApi(
      query.type,
      query.endpoint,
      formData
    );

    if (response.error) {
      console.log(response.error);
    } else {
      if (response.data) {
        urlContentStore.set(response.data);
        loadingStore.set(false);
      } else {
        // WIP: this needs to be handled better!
        loadingStore.set(false);
      }
    }
  }
</script>

<div class="grid w-full grid-cols-1 bg-white pr-4 md:grid-cols-12 dark:bg-gray7">
  <section class="col-span-3 w-full px-3">
    {#if data.urlFormConfig}
      <Form config={data.urlFormConfig} onSubmit={handleSubmit} />
    {/if}
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

    <Button
      on:click={() => {
        console.log('click');
      }}
      ariaLabel="Open select metadata modal"
    >
      Filter Metadata
    </Button>
    <div>
      <Label for="filter_result">Filter Result</Label>
      <InputText name="filter result" id="filter_result"></InputText>
    </div>
    <Button on:click={() => {}} ariaLabel="Download result as csv">Download CSV</Button>
  </section>

  <section class="col-span-9 col-start-auto w-full">
    <div>
      {#if $inputStore && $inputStore.has('url') && $inputStore.get('url') !== ''}
        <span class="block py-2 text-xs dark:text-white">
          Results for: <Link href={$inputStore.get('url')}>{$inputStore.get('url')}</Link></span
        >
      {/if}
    </div>

    <div>
      {#if $urlContentStore && $urlContentStore.results && $urlContentStore.results.length > 0}
        <Table caption="" data={$urlContentStore} headerData={TABLE_CONTENT_HEADER} />
      {/if}
    </div>
  </section>
</div>

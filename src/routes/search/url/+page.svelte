<script lang="ts">
  import { onMount } from 'svelte';
  import Dialog from '$components/Dialog.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputFile from '$components/InputFile.svelte';
  import Button from '$components/Button.svelte';
  import Form from '$components/Form.svelte';
  import Table from '$components/Table.svelte';
  import Link from '$components/Link.svelte';
  import { URL_PAGE_FORM_CONFIG, UI_CONTENT_HEADER } from '$config';
  import { Content, type ResponseData, type ApiResponse } from '$models';
  import { parseUrl } from '$api';
  import { loadingStore } from '$stores/loading.ts';
  import { contentStore } from '$stores/content.ts';
  import { inputStore } from '$stores/input.ts';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    inputStore.set(formData);
    let response: ApiResponse<any> = await parseUrl(formData);
    if (response.error) {
      console.log(response.error);
    } else {
      let content = new Content(response.data as ResponseData);
      contentStore.set(content);
      loadingStore.set(false);
    }
  }

  import { page } from '$app/stores';
	export let data; 

  onMount(()=> {
    console.log(data);

  })

</script>

<div class="grid w-full grid-cols-1 bg-gray4 pr-4 md:grid-cols-12">
  <section class="col-span-3 w-full px-3">
    <Form config={URL_PAGE_FORM_CONFIG} onSubmit={handleSubmit} />

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
      onClick={() => {
        return 0;
      }}
      ariaLabel="Open select metadata modal"
    >
      Filter Metadata
    </Button>
    <div>
      <Label for="filter_result">Filter Result</Label>
      <InputText name="filter result" id="filter_result"></InputText>
    </div>
    <Button
      onClick={() => {
        return 0;
      }}
      ariaLabel="Download result as csv"
    >
      Download CSV
    </Button>
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
      {#if !$contentStore.isEmpty()}
        <Table caption="" data={$contentStore} headerData={UI_CONTENT_HEADER} />
      {/if}
    </div>
  </section>
</div>

<script lang="ts">
  import Dialog from '$components/Dialog.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import Button from '$components/Button.svelte';
  import FormContentSimilarity from '$components/FormContentSimilarity.svelte';
  import DataTable from '$components/DataTable.svelte';
  import { UI_CONTENT_HEADER } from '$config';
  import type { ContentResult } from '$models';
  import { contentStore } from '$stores/content.ts';
  let results:  ContentResult[] | [] = $contentStore.isEmpty() ? [] : $contentStore.getResults();
  let header_items = UI_CONTENT_HEADER.map((v) => v.value);

</script>

<main class="w-full">
  <nav class="bg-purple-500">
    <ul class="flex w-full">
      <li><a href="."> Content </a></li>
      <li><a href="."> Url </a></li>
      <li><a href="."> Metadata </a></li>
    </ul>
  </nav>

  <div class="grid grid-cols-1 md:grid-cols-2">
    <!-- search bar nav -->

    <section class="h-[400px] w-full bg-yellow-500">
      <!-- toolbar -->
      <h2>Content Similarity</h2>
      <!-- <FormContentSimilarity /> -->

      <Dialog let:C>
        <C.Trigger>New API key</C.Trigger>
        <C.Portal>
          <C.Overlay />
          <C.Content>
            <C.Title>Batch Download</C.Title>
            <C.Description class="text-foreground-alt text-sm">text</C.Description>
            <div class="flex flex-col items-start gap-1 pb-11 pt-7">
              <Label for="apiKey" class="text-sm font-medium">API Key</Label>
              <div class="relative w-full">
                <input
                  id="apiKey"
                  class="h-input rounded-card-sm border-border-input bg-background placeholder:text-foreground-alt/50 hover:border-dark-40 focus:ring-foreground focus:ring-offset-background inline-flex w-full items-center border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  placeholder="secret_api_key"
                  type="password"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="flex w-full justify-end">
              <C.Close
                class="h-input rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 focus-visible:ring-dark focus-visible:ring-offset-background active:scale-98 inline-flex items-center justify-center px-[50px] text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                Save
              </C.Close>
            </div>
            <C.Close
              class="focus-visible:ring-foreground focus-visible:ring-offset-background active:scale-98 absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <div>
                <span class="sr-only">Close</span>
              </div>
            </C.Close>
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

    <section class="h-[400px] w-full bg-pink-500">
      <div>
        <span> searched term: result </span>
        <!-- searched term bar-->
      </div>

      <div>
        {#if results.length > 0}
          <DataTable
            caption=""
            data={results}
            header={UI_CONTENT_HEADER}
            rowBorder={true}
          />
        {/if}
        <!-- result table-->
      </div>
    </section>
  </div>
</main>

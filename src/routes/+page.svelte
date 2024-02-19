<script lang="ts">
  import Tabs from '$components/Tabs.svelte';
  import FormContentSimilarity from '$components/FormContentSimilarity.svelte';
  import Label from '$components/Label.svelte';
  import type { LabeledValue, ContentResult } from '$models';
  import { parseUrl } from '$api';
  import { contentStore } from '$stores/content';

  async function handleSubmit (event: Event) { 
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    let content : ContentResult = await parseUrl(formData) as ContentResult;
    $contentStore.set({formData, content});
  }

</script>

<main class="w-100">
  <section class="grid grid-rows-2 gap-4">
    <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="bg-blue-300">Explanation</div>
      <div class="">
        <Tabs value="content similarity" let:C>
          <C.List>
            <C.Trigger value="content similarity">Content similarity</C.Trigger>
            <C.Trigger value="metadata similarity">Metadata similarity</C.Trigger>
          </C.List>
          <C.Content value="content similarity">
            <p>
              Search for similar content shared across the internet. Laundromat uses popular search
              engines to find related websites. Discover networks of malicious actors/websites
              collectively sharing disinformation.
            </p>
            <FormContentSimilarity onSubmit={handleSubmit}/>
            <a href="search"> advanced search </a>
          </C.Content>
          <C.Content value="metadata similarity">test 2 test 2</C.Content>
        </Tabs>
      </div>
    </div>
    <div>
      <Label for="use case list" class="bg-green-300">Label!</Label>
      <ul id="use case list" class="grid grid-cols-1 gap-x-4 md:grid-cols-3">
        <li class="bg-pink-500">test1</li>
        <li class="bg-pink-500">test2</li>
        <li class="bg-pink-500">test3</li>
      </ul>
    </div>
  </section>
</main>

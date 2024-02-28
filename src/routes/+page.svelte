<script lang="ts">
  import { goto } from '$app/navigation';
  import Tabs from '$components/Tabs.svelte';
  import FormContentSimilarity from '$components/FormContentSimilarity.svelte';
  import Label from '$components/Label.svelte';
  import { ContentData, type LabeledValue, type ContentResponse } from '$models';
  import { parseUrl } from '$api';
  import { inputStore } from '$stores/input';
  import { loadingStore } from '$stores/loading';
  import { contentStore } from '$stores/content';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    inputStore.set(formData);
    let contentResponse: ContentResponse = await parseUrl(formData);
    let content = new ContentData(contentResponse);
    contentStore.set(content);
    loadingStore.set(false);
    goto('/search/url');
  }
</script>

  <section class="grid grid-rows-2 gap-4">
    <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="sans outline outline-1">Explanation</div>
      <div class="">
        <Tabs value="content similarity" class="outline outline-1" let:C>
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
            <FormContentSimilarity onSubmit={handleSubmit} />
            <a href="search"> advanced search </a>
          </C.Content>
          <C.Content value="metadata similarity">test 2 test 2</C.Content>
        </Tabs>
      </div>
    </div>
    <div>
      <ul id="use case list" class="grid grid-cols-1 gap-x-4 md:grid-cols-3">
        <li class="outline outline-1">test1</li>
        <li class="outline outline-1">test2</li>
        <li class="outline outline-1">test3</li>
      </ul>
    </div>
  </section>

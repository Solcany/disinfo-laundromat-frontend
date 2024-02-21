<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import { enhance, applyAction } from '$app/forms';
  import DropdownSelect from '$components/DropdownSelect.svelte';
  import DropdownSelectItem from '$components/DropdownSelectItem.svelte';
  import Button from '$components/Button.svelte';
  import Label from '$components/Label.svelte';
  import InputTextArea from '$components/InputTextArea.svelte';
  import type { LabeledValue } from '$models';
  import { content_api_input, region_data, language_data, browser_data } from '$dummy_data';
  import { contentStore } from '$stores/content.ts';
  import { loadingStore } from '$stores/loading.ts';

  export let onSubmit: (event: Event) => void = () => {};

  // const unsubscribeFormDataStore = formDataStore.subscribe((data: FormData) => (formData = data));

  // onMount(() => {
  //   return () => {
  //     unsubscribeFormDataStore();
  //   };
  // });
</script>

<form on:submit={(event) => onSubmit(event)}>
  <div class="flex">
    <div>
      <Label for="url_input">Content</Label>
      <InputTextArea name="url" id="url_input" required />
    </div>
    <Button type="submit" ariaLabel="Submit form">Submit</Button>
  </div>

  <Label for="region_input">Region</Label>
  <DropdownSelect
    id="region_input"
    name="region"
    value={content_api_input.region}
    items={region_data}
    required
  >
    {#each region_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <Label for="language_input">Language</Label>
  <DropdownSelect id="language_input" name="language" value={content_api_input.language} required>
    {#each language_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <Label for="region_input">Browser</Label>
  <DropdownSelect
    id="language_input"
    name="browser"
    value={content_api_input.browser}
    multiple={true}
    required
  >
    {#each browser_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>
</form>

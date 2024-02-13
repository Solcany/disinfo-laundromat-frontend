<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import DropdownSelect from '$components/DropdownSelect.svelte';
  import DropdownSelectItem from '$components/DropdownSelectItem.svelte';
  import Label from '$components/Label.svelte';
  import InputTextArea from '$components/InputTextArea.svelte';
  import type { FormData, LabeledValue } from '$types';
  import { region_data, language_data, browser_data } from '$dummy_data';
  import { formDataStore } from '$stores/form.ts';
  import { loadingStore } from '$stores/loading.ts';

  let formData: FormData;

  const unsubscribeFormDataStore = formDataStore.subscribe((data: FormData) => (formData = data));

  function handleSubmit(event : Event) {
    formDataStore.set(formData);
    const d = event.target as HTMLFormElement;
    const formDataEntries = new FormData(d).entries();
    for (const [name, value] of formDataEntries) {
        console.log(name,':', value);
      }
    loadingStore.set(true);
    setTimeout(() => {
      //goto('/content_search');
      loadingStore.set(false);
    }, 1000);
  }

  onMount(() => {
    return () => {
      unsubscribeFormDataStore();
    };
  });
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="flex">
    <div>
      <Label for="content_input">Content</Label>
      <InputTextArea name="content" id="content_input" bind:value={formData.content} required />
    </div>
    <button type="submit">Submit</button>
  </div>

  <Label for="region_input">Region</Label>
  <DropdownSelect id="region_input" name="region" items={region_data} bind:value={formData.region} required>
    {#each region_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <Label for="language_input">Language</Label>
  <DropdownSelect id="language_input" name="language" bind:value={formData.language} required>
    {#each language_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <Label for="region_input">Browser</Label>
  <DropdownSelect id="language_input" name="browser" bind:value={formData.browser} multiple={true} required>
    {#each browser_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>
</form>

<script lang="ts">
  import type { Writable } from 'svelte/store'; 
  import Button from '$components/Button.svelte';
  export let formDataStore: Writable<FormData>;

  //$: formConfig = data.contentAdvancedFormConfig;

  export let formData: FormData;

  function handleClick() {
    formDataStore.set(formData);
  }
</script>

<div>
  <Button ariaLabel="Set form data" on:click={handleClick}> Try Search </Button>
</div>



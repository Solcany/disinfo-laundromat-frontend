<script lang="ts">
  import DropdownSelect from '$components/DropdownSelect.svelte';
  import DropdownSelectItem from '$components/DropdownSelectItem.svelte';
  import Button from '$components/Button.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import type { LabeledValue } from '$models';
  import {
    CONTENT_SEARCH_FORM_CONFIG,
    InputType,
    content_api_input,
    region_data,
    language_data,
    browser_data,
    operator_data
  } from '$dummy_data';
  export let onSubmit: (event: Event) => void = () => {};
  export let value: string = '';

</script>

<form on:submit={(event) => onSubmit(event)}>
  {#each CONTENT_SEARCH_FORM_CONFIG as item}
    {#if item.type === InputType.Text}
    {@const id = item.name + '_input'}
      <div>
        <Label for={id} class="block dark:text-white">{item.label}</Label>
        <InputText
          id={id}
          value={item.value}
          name={item.name}
          class="outline outline-1"
          required={item.required}
          placeholder={item.placeholder}
        />
      </div>
    {:else if item.type === InputType.Dropdown}
    {#if item.data}
      {@const id = item.name + '_input'}
        <div>
          <Label for={id}>{item.label}</Label>
          <DropdownSelect
            id={id}
            name={item.name}
            items={item.data}
            selected={item.value}
            required={item.required}
            placeholder={item.placeholder}>
            
            {#each item.data as v}
              <DropdownSelectItem value={v.value} label={v.label}/> 
            {/each}
          </DropdownSelect>
        </div>
        {/if}
      {/if}
  {/each}

  <Button type="submit" ariaLabel="Submit form">→</Button>

</form>

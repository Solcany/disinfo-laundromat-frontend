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
    {#if item.type == InputType.Text}
      <div class="flex">
        <Label for={item.name + '_input'} class="block dark:text-white">{item.label}</Label>
        <InputText
          id={item.name + '_input'}
          value={item.value?.value}
          name={item.name}
          class="outline outline-1"
          required={item.required}
          placeholder={item.placeholder}
        />
      </div>
    {:else if item.type == InputType.Dropdown && item.data !== undefined && item.value}

      <div>
        <Label for={item.name + '_input'}>{item.label}</Label>

        <DropdownSelect
          id={item.name + '_input'}
          name={item.name}
          items={item.data}
          required={item.required}
          placeholder={item.placeholder}>
          
          {#each item.data as v}
            <DropdownSelectItem value={v.value} label={v.label}/>   
          {/each}


        </DropdownSelect>
      </div>
    {/if}
  {/each}

  <!--
{#each CONTENT_SEARCH_FORM_CONFIG as item}
  {if item.type === InputTypes.Text}

  {/if}
{/each}

-->
  <!--
    <div class="flex">
      <Label for={item.name + "_input"} class="block dark:text-white">{item.label}</Label>

      <InputText id={item.name + "_input"} value={item.value} name={item.name} class="outline outline-1" required={item.required} placeholder={item.placeholder} />
    </div>
-->
  <Button type="submit" ariaLabel="Submit form">→</Button>
  <Label for="region_input">Region</Label>
  <DropdownSelect
    id="region_input"
    name="country"
    value={content_api_input.region}
    items={region_data}
    required>
    {#each region_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <!--
  <Label for="language_input">Language</Label>
  <DropdownSelect id="language_input" name="language" value={content_api_input.language} required>
    {#each language_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <Label for="browser_input">Browser</Label>
  <DropdownSelect
    id="browser_input"
    name="search_engines"
    value={content_api_input.browser}
    multiple={true}
    required
  >
    {#each browser_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  <Label for="operator_input">Operator</Label>
  <DropdownSelect
    id="operator_input"
    name="combineOperator"
    value={content_api_input.operator}
    multiple={true}
    required
  >
    {#each operator_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>

  -->
</form>

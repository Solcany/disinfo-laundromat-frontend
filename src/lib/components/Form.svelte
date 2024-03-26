<script lang="ts">
  import DropdownSelect from '$components/DropdownSelect.svelte';
  import DropdownSelectItem from '$components/DropdownSelectItem.svelte';
  import Button from '$components/Button.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import InputTextArea from '$components/InputTextArea.svelte';
  import InputCheckbox from '$components/InputCheckbox.svelte';
  import InputCheckboxGroup from '$components/InputCheckboxGroup.svelte';
  import { ArrowRight } from 'phosphor-svelte';
  import { type InputConfig, InputType, FormOrientation, Endpoint, QueryType } from '$models';
  export let config: InputConfig[];
  export let onSubmit: (event: Event, query: { type: QueryType; endpoint: Endpoint }) => void;
  export let orientation: FormOrientation = FormOrientation.Vertical;

  let query: { type: QueryType; endpoint: Endpoint } | undefined;

  function handleSubmit(event: Event) {
    if (query) {
      onSubmit(event, query);
    }
  }
</script>

<form on:submit={(event) => handleSubmit(event)} class="flex flex-col">
  {#each config as item}
    {#if item.type === InputType.Text}
      {@const id = item.name + '_input'}
      <div class="pb-2 {item.submitQuery ? 'flex items-end' : ''}">
        <div class="w-full">
          <Label for={id} class="block py-1">{item.label}</Label>
          <InputText
            {id}
            value={item.value}
            name={item.name}
            class="outline outline-1"
            required={item.required}
            placeholder={item.placeholder}
          />
        </div>
        {#if item.submitQuery}
          <Button
            type="submit"
            ariaLabel="Submit form"
            on:click={() => (query = item.submitQuery)}
            variant="glyph"><ArrowRight weight="bold" class="dark:fill-black" /></Button
          >
        {/if}
      </div>
    {:else if item.type === InputType.TextArea}
      {@const id = item.name + '_input'}
      <div class="pb-2 w-fulll pr-2 {item.submitQuery ? 'flex items-end' : ''}">
          {#if item.submitQuery}
          <div class="w-full pr-2">
          <Label for={id} class="block py-1">{item.label}</Label>
            <div class="flex items-center">
              <InputTextArea
                {id}
                class="mr-2"
                value={item.value}
                name={item.name}
                required={item.required}
                placeholder={item.placeholder}
              />
              <Button
                type="submit"
                ariaLabel="Submit form"
                on:click={() => (query = item.submitQuery)}
                variant="glyph"> 
                  <ArrowRight weight="bold" class="dark:fill-black"/>
              </Button>
            </div>
          </div>
          {:else}
          <Label for={id} class="block py-1">{item.label}</Label>
          <InputTextArea
            {id}
            value={item.value}
            name={item.name}
            required={item.required}
            placeholder={item.placeholder}/>
          {/if}
      </div>
    {:else if item.type === InputType.Dropdown}
      {#if item.data}
        {@const id = item.name + '_input'}
        <div class="pb-2 inline-block">
          <Label for={id} class="block py-1">{item.label}</Label>
          <DropdownSelect
            {id}
            name={item.name}
            items={item.data}
            selected={item.value}
            required={item.required}
            placeholder={item.placeholder}
          >
            {#each item.data as entry}
              <DropdownSelectItem value={entry.value} label={entry.label} />
            {/each}
          </DropdownSelect>
        </div>
      {/if}
    {:else if item.type === InputType.Checkbox}
      <div class="pb-2 inline-block">
        <InputCheckbox
          name={item.name}
          label={item.label}
          checked={item.checked}
          required={item.required}
          value={item.value}
        />
      </div>
    {:else if item.type === InputType.CheckboxGroup}
      {#if item.data}
      <div class="pb-2 inline-block">
        <InputCheckboxGroup 
          label={item.label} 
          data={item.data}
          orientation={orientation}/>
      </div>
      {/if}
    {/if}
  {/each}

  <!-- <InputCheckboxGroup/> -->
</form>

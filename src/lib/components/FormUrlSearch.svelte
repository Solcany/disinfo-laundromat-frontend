<script lang="ts">
  import DropdownSelect from '$components/DropdownSelect.svelte';
  import DropdownSelectItem from '$components/DropdownSelectItem.svelte';
  import Button from '$components/Button.svelte';
  import Label from '$components/Label.svelte';
  import InputText from '$components/InputText.svelte';
  import type { LabeledValue } from '$models';
  import { content_api_input, region_data, language_data, browser_data, operator_data} from '$dummy_data';
  export let onSubmit: (event: Event) => void = () => {};
  export let value: string = '';
</script>

<form on:submit={(event) => onSubmit(event)}>
  <div class="flex">
    <div>
      <Label for="url_input" class="block dark:text-white" >Url</Label>
      <div class="flex item-center">
        <InputText {value} name="url" id="url_input" class="outline outline-1" required />
        <Button type="submit" ariaLabel="Submit form">→</Button>
      </div>
    </div>
  </div>

  <Label for="region_input">Region</Label>
  <DropdownSelect
    id="region_input"
    name="country"
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

  <Label for="browser_input">Browser</Label>
  <DropdownSelect
    id="browser_input"
    name="search_engines"
    value={content_api_input.browser}
    multiple={true}
    required>
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
    required>
    {#each operator_data as item}
      <DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
    {/each}
  </DropdownSelect>
</form>

<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import InputCheckbox from '$components/InputCheckbox.svelte';
  import { Minus, Check } from 'phosphor-svelte';
  import { type LabeledValue, FormOrientation } from '$models';
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
  import Label from '$components/Label.svelte';
  export let label: string;
  export let data: LabeledValue[];
  export let orientation: FormOrientation = FormOrientation.Vertical;
  export let checked: string[] | LabeledValue[] | undefined = undefined;
  let checkedItems: (boolean | 'indeterminate')[] = [];
  let selectedState = true;

  if (checked && checked.length > 0) {
    let checkedIndices = findCheckedIndices(data, checked);
    checkedItems = data.map((_: LabeledValue, index: number) => checkedIndices.includes(index));
  } else {
    checkedItems = new Array(data.length).fill(false);
  }

  function findCheckedIndices(
    items: LabeledValue[],
    checked: (string | LabeledValue)[] | undefined
  ): number[] {
    if (!checked || checked.length === 0) return [];
    return items.reduce((acc: number[], { value }, index: number) => {
      const isValueChecked = checked.some((checkedItem) => {
        if (typeof checkedItem === 'string') {
          return checkedItem === value;
        } else if ('value' in checkedItem) {
          return checkedItem.value === value;
        }
        return false;
      });
      if (isValueChecked) acc.push(index);
      return acc;
    }, []);
  }

  function handleCheckedChange(i: number, change: boolean | 'indeterminate') {
    checkedItems[i] = change;
  }

  function handleToggleAll() {
    if (selectedState) {
      selectedState = !selectedState;
      checkedItems = checkedItems.map((_) => true);
    } else {
      selectedState = !selectedState;
      checkedItems = checkedItems.map((_) => false);
    }
  }
</script>

<div class={cn('', className)}>
  <Label
    id="terms-label"
    for="terms"
    class="font-regular font-sans text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
  >
    {label}
  </Label>
  <ul
    class="flex {orientation === FormOrientation.Vertical
      ? 'flex-col'
      : 'grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4'}"
  >
    {#each data as item, index}
      <li
        class="flex items-center space-x-1 pb-1 {orientation === FormOrientation.Horizontal
          ? 'pr-2 '
          : ''}"
      >
        <Checkbox.Root
          name={'search_engines'}
          value={item.value.toString()}
          checked={checkedItems[index]}
          onCheckedChange={(change) => handleCheckedChange(index, change)}
          id="terms"
          aria-labelledby="terms-label"
          class="border-muted active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] shrink-0 items-center justify-center rounded-input border bg-white transition-all duration-150 ease-in-out"
        >
          <Checkbox.Indicator
            let:isChecked
            let:isIndeterminate
            class="inline-flex size-[15px] items-center justify-center text-white"
          >
            {#if isChecked}
              <Check class="size-[15px] fill-black" weight="bold" />
            {:else if isIndeterminate}
              <Minus class="size-[15px]" weight="bold" />
            {/if}
          </Checkbox.Indicator>
          <Checkbox.Input />
        </Checkbox.Root>
        <Label
          id="terms-label"
          for="terms"
          class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {item.label}
        </Label>
      </li>
    {/each}
  </ul>
  <button
    type="button"
    class="font-sans font-light text-black underline dark:text-white"
    on:click={() => handleToggleAll()}>{selectedState ? 'Select all' : 'Unselect all'}</button
  >
</div>

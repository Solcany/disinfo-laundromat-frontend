<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import InputCheckbox from '$components/InputCheckbox.svelte';
  import Label from '$components/Label.svelte';
  import { Minus, Check } from 'phosphor-svelte';
  import { type LabeledValue }  from '$types';
  import { FormOrientation } from '$components/Form.svelte';
  import { cn } from '$utils';

  let className: string = '';
  export { className as class };
  export let name: string;
  export let label: string;
  export let data: LabeledValue[];
  export let orientation: FormOrientation = FormOrientation.Vertical;
  export let checked: string[] | LabeledValue[] | undefined = undefined;
  export let required: boolean = false;
  let checkedItems: boolean[] = [];

  if (checked && checked.length > 0) {
    let checkedIndices = findCheckedIndices(data, checked);
    checkedItems = data.map((_, index) => checkedIndices.includes(index));
  } else {
    checkedItems = new Array(data.length).fill(false);
  }

  function findCheckedIndices(
    items: LabeledValue[],
    checked: (string | LabeledValue)[] | undefined
  ): number[] {
    if (!checked || checked.length === 0) return [];
    return items.reduce((acc: number[], { value }, index: number) => {
      const isValueChecked = checked.some((checkedItem) =>
        typeof checkedItem === 'string'
          ? checkedItem === value
          : 'value' in checkedItem && checkedItem.value === value
      );
      if (isValueChecked) acc.push(index);
      return acc;
    }, []);
  }

  function handleCheckedChange(i: number, checked: boolean | 'indeterminate') {
    if (checked === 'indeterminate') {
      return;
    }
    checkedItems[i] = checked;
    if (!checkedItems.some(Boolean)) {
      checkedItems[i] = true;
    }
  }

  $: {
    if (required && checkedItems.every((item) => !item)) {
      checkedItems[0] = true;
    }
  }
</script>

<div class={cn('', className)}>
  <Label
    for="checkbox-group"
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
          ? 'pr-2'
          : ''}"
      >
        <Checkbox.Root
          {name}
          value={item.value.toString()}
          checked={checkedItems[index]}
          onCheckedChange={(change) => handleCheckedChange(index, change)}
          class="border-muted active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] shrink-0 items-center justify-center rounded-input border bg-white transition-all duration-150 ease-in-out"
        >
          <Checkbox.Indicator
            class="inline-flex size-[15px] items-center justify-center text-white"
          >
            {#if checkedItems[index]}
              <Check class="size-[15px] fill-black" weight="bold" />
            {/if}
          </Checkbox.Indicator>
          <Checkbox.Input id={`checkbox-${index}`} />
        </Checkbox.Root>
        <Label
          for={`checkbox-${index}`}
          class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {item.label}
        </Label>
      </li>
    {/each}
  </ul>
</div>

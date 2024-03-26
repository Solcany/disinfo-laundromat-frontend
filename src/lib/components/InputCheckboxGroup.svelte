<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { Minus, Check } from 'phosphor-svelte';
  import  { type LabeledValue, FormOrientation } from '$models';
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
  import Label from '$components/Label.svelte';
  export let label: string;
  export let data: LabeledValue[];
  export let orientation: FormOrientation = FormOrientation.Vertical;
  let checked: (boolean | 'indeterminate')[] = new Array(data.length).fill(true);
  let selectedState = false;
  function handleCheckedChange(i: number, change: boolean | 'indeterminate') {
    checked[i] = change;
  }

  function handleToggleAll() {
    if(selectedState) {
    selectedState = !selectedState
    checked = checked.map((_) => true);
    } else {
    selectedState = !selectedState
    checked = checked.map((_) => false);

    }
  }
</script>

<div class={cn('', className)}>
  <Label
    id="terms-label"
    for="terms"
    class="text-sm font-sans font-regular dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    {label}
  </Label>
  <ul class="flex {orientation === FormOrientation.Vertical ? 'flex-col' : 'flex-row flex-wrap'}">
  {#each data as item, index}
    <li class="pb-1 flex items-center space-x-3 {orientation === FormOrientation.Vertical ? '' : 'pr-2'}">
      <Checkbox.Root
        name={'search_engines'}
        value={item.value.toString()}
        checked={checked[index]}
        onCheckedChange={(change) => handleCheckedChange(index, change)}
        id="terms"
        aria-labelledby="terms-label"
        class="border-muted bg-white active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out"
      >
        <Checkbox.Indicator
          let:isChecked
          let:isIndeterminate
          class="text-white inline-flex items-center justify-center" >
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
        class="text-sm font-sans font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {item.label}
      </Label>
    </li>
  {/each}
  </ul>
  <button type="button" class="font-sans underline  font-light dark:text-white text-black" on:click={() => handleToggleAll()}>{selectedState? 'Select all' : 'Unselect all'}</button>
</div>

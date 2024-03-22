<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { Minus, Check } from 'phosphor-svelte';
  import type { LabeledValue } from '$models'; 
  import Label from '$components/Label.svelte';
  export let data: LabeledValue[];  

  let checked: (boolean | 'indeterminate')[]  = new Array(data.length).fill(true);

  function handleCheckedChange(i: number, change: boolean | 'indeterminate') {
    checked[i] = change;
  }
  function handleSelectAll() {
    checked = checked.map(_  => true);
  }
</script>

<div>
    <button type="button" on:click={()=>handleSelectAll()}>select all </button>
  {#each data as item, index}
    <div class="flex items-center space-x-3">
      <Checkbox.Root
        name={"search_engines"}
        value={item.value.toString()}
        checked={checked[index]}
        onCheckedChange={(change) => handleCheckedChange(index, change)}
        id="terms"
        aria-labelledby="terms-label"
        class="border-muted bg-foreground active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out">
        <Checkbox.Indicator
          let:isChecked
          let:isIndeterminate
          class="text-background inline-flex items-center justify-center">
          {#if isChecked}
            <Check class="size-[15px] fill-white" weight="bold" />
          {:else if isIndeterminate}
            <Minus class="size-[15px]" weight="bold" />
          {/if}
        </Checkbox.Indicator>
        <Checkbox.Input />
      </Checkbox.Root>
      <Label
        id="terms-label"
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
       {item.label}
      </Label>
    </div>
  {/each}
</div>

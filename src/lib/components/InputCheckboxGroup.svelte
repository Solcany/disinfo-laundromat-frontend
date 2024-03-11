<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { Minus, Check } from 'phosphor-svelte';
  import Label from '$components/Label.svelte';

  let selected: number[] = [];
  const items: number[] = [1, 2, 3, 4, 5]; // Example items
  function toggleAll(event: Event) {
    const target = event.target as HTMLInputElement;
    selected = target.checked ? [...items] : [];
  }
</script>

<div>
  {selected.length} Selected
  <label>
    <input type="checkbox" on:change={toggleAll} checked={selected.length === items.length} />
    <strong>All</strong>
  </label>
  {#each items as item}
    <label>
      <input type="checkbox" bind:group={selected} name={item.toString()} value={item} />
      {item}
    </label>
  {/each}

  {#each items as item}
    <div class="flex items-center space-x-3">
      <Checkbox.Root
        name={item.toString()}
        value={item.toString()}
        id="terms"
        aria-labelledby="terms-label"
        class="border-muted bg-foreground active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out"
        checked={true}
      >
        <Checkbox.Indicator
          let:isChecked
          let:isIndeterminate
          class="text-background inline-flex items-center justify-center"
        >
          {#if isChecked}
            <Check class="size-[15px]" weight="bold" />
          {:else if isIndeterminate}
            <Minus class="size-[15px]" weight="bold" />
          {/if}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <Label
        id="terms-label"
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </Label>
    </div>
  {/each}
</div>

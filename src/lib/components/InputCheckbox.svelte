<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { Check } from 'phosphor-svelte';
  import Label from '$components/Label.svelte';
  export let name: string;
  export let label: string;
  export let required: boolean;
  export let checked = false;
  let className: string | undefined = undefined;
  export { className as class };

  let id = name + '_input';
  let label_id = name + '_label';
</script>

<div class="flex items-center space-x-3">
  <Checkbox.Root
    {id}
    {name}
    aria-labelledby={label_id}
    class="border-muted bg-foreground active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out background-black"
    {...$$restProps}
  >
    <Checkbox.Indicator
      let:isChecked
      class="text-background inline-flex items-center justify-center"
    >
      {#if isChecked}
        <Check class="size-[15px] fill-black" weight="bold" />
      {/if}
    </Checkbox.Indicator>
    <Checkbox.Input />
  </Checkbox.Root>
  <Label
    for={id}
    id={label_id}
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    {label}
  </Label>
</div>

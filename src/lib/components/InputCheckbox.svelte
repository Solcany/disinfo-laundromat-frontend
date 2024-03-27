<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { Check } from 'phosphor-svelte';
  import Tooltip from '$components/Tooltip.svelte';
  import Label from '$components/Label.svelte';
  export let name: string;
  export let label: string;
  export let required: boolean;
  export let tooltip: string | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
  let id = name + '_input';
  let label_id = name + '_label';
</script>

<div class="flex items-center space-x-1">
  <Checkbox.Root
    {id}
    {name}
    aria-labelledby={label_id}
    class="border-muted active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border bg-white transition-all duration-150 ease-in-out"
    {...$$restProps}
  >
    <Checkbox.Indicator
      let:isChecked
      class="text-background inline-flex items-center justify-center bg-white"
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
    title={tooltip}
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    {label}
  </Label>
  {#if tooltip}
    <Tooltip>
      <svelte:fragment slot="icon">i</svelte:fragment>
      <svelte:fragment slot="content">{tooltip}</svelte:fragment>
    </Tooltip>
  {/if}
</div>

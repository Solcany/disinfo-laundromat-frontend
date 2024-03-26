<script lang="ts">
  import { Select } from 'bits-ui';
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import { flyAndScale } from '$utils';
  import type { LabeledValue } from '$models';
  export let id: string;
  export let name: string;
  export let selected: LabeledValue | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  let isOpen: boolean = $$restProps.open || false;

  function handleOpenChange(open: boolean) {
    isOpen = open;
    if ($$restProps.onOpenChange) {
      $$restProps.onOpenChange(open);
    }
  }
</script>

<div {id} class={className}>
  <Select.Root {name} bind:selected onOpenChange={handleOpenChange} {...$$restProps}>
    <Select.Trigger
      class="min-w-[150px] border-border-input placeholder:text-black-alt/50 flex h-input items-center justify-between rounded-input bg-white p-4 px-2 transition-colors duration-200 hover:bg-gray1 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-focus focus:ring-offset-1 focus:ring-offset-black focus:ring-offset-black"
      aria-label={ariaLabel}
    >
      <Select.Value class="text-sm" {placeholder} />
      {#if isOpen}
        <CaretUp weight="bold" />
      {:else}
        <CaretDown weight="bold" />
      {/if}
    </Select.Trigger>
    <Select.Content
      class="max-h-96 w-full overflow-y-auto rounded-input bg-white shadow-xl hover:cursor-pointer"
      transition={flyAndScale}
      sideOffset={4}
    >
      <slot />
    </Select.Content>
    <Select.Input id={name} />
  </Select.Root>
</div>

<!-- Wrapper component based on https://www.bits-ui.com/docs/components/select -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Select, Label, type Selected, type SelectProps } from 'bits-ui';
  import type { LabeledValue } from '$models';
  export let id: string;
  export let name: string;
  export let selected: LabeledValue | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>

<div {id} class={className}>
  <Select.Root {name} bind:selected {...$$restProps}>
    <Select.Trigger
      class="h-input rounded-9px border-border-input placeholder:text-foreground-alt/50 focus:ring-foreground focus:ring-offset-background inline-flex w-[296px] items-center border bg-white px-[11px]  text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      aria-label={ariaLabel}
    >
      <Select.Value class="text-sm" {placeholder} />
    </Select.Trigger>
    <Select.Content
      class="border-muted shadow-popover w-full rounded-xl border bg-white px-1 py-3 outline-none"
      sideOffset={8}
    >
      <slot />
    </Select.Content>
    <Select.Input id={name} />
  </Select.Root>
</div>

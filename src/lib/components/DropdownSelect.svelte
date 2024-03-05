<!-- Wrapper component based on https://www.bits-ui.com/docs/components/select -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Select, Label, type Selected, type SelectProps } from 'bits-ui';
  import type { LabeledValue } from '$models';
  export let id: string;
  export let name: string;
  export let value: LabeledValue;
  export let ariaLabel: string = '';
  export let placeholder: string = ''
  let className: string | undefined = undefined;
  export { className as class };
</script>

<div {id} class={className}>
  <Select.Root {name} bind:selected={value} {...$$restProps}>
    <Select.Trigger
      class="inline-flex h-input w-[296px] items-center rounded-9px border border-border-input bg-white px-[11px] text-sm transition-colors placeholder:text-foreground-alt/50  focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
      aria-label={ariaLabel}
    >
    <Select.Value class="text-sm" {placeholder}/>
    </Select.Trigger>
    <Select.Content
      class="w-full rounded-xl border border-muted bg-white px-1 py-3 shadow-popover outline-none"
      sideOffset={8}>
      <slot />
    </Select.Content>
    <Select.Input id={name} />
  </Select.Root>
</div>

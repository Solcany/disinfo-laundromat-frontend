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
  <Select.Root {name} bind:selected={selected} {...$$restProps}>
  <Select.Trigger
    class="inline-flex h-10 w-[296px] items-center rounded-md border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm transition-colors placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white relative"
    aria-label={ariaLabel}
  >
          <Select.Value class="text-sm flex-grow" {placeholder} />
    <!-- Add your SVG icon for the dropdown caret -->
    <svg class="h-4 w-4 text-gray-700 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
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

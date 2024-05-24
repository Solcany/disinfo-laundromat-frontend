<script lang="ts">
  // https://www.bits-ui.com/docs/components/tooltip

  /*
    add content through named slots:
    <Tooltip>
          <svelte:fragment slot="icon">i</svelte:fragment>
          <svelte:fragment slot="content">{association}</svelte:fragment>
    </Tooltip>

  */
  type variant = 'circle' | 'rectangle';
  export let variant: variant = 'circle';

  import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Root openDelay={0} closeDelay={0} {...$$restProps}>
  <Tooltip.Trigger
    class="shadow-btn inline-flex shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold text-white dark:bg-white dark:text-black dark:text-black
  {variant === 'circle' ? 'size-4 p-2' : 'h-4 px-2 '}
  "
  >
    <slot name="icon" />
  </Tooltip.Trigger>
  <Tooltip.Content class="z-50 rounded-input bg-black font-sans dark:bg-white" sideOffset={6}>
    <div class="bg-white">
      <Tooltip.Arrow class="border-dark-10 rounded-[2px] border-l border-t" />
    </div>
    <div
      class="border-dark-10 bg-background shadow-popover flex items-center justify-center rounded-input border p-3 text-sm font-medium outline-none"
    >
      <slot name="content" />
    </div>
  </Tooltip.Content>
</Tooltip.Root>

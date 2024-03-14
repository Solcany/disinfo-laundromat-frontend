<script lang="ts">
  import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Root openDelay={0} {...$$restProps}>
  <Tooltip.Trigger
    class="border-border-input shadow-btn focus-visible:ring-dark focus-visible:ring-offset-background inline-flex  
  size-4 shrink-0 items-center justify-center rounded-full border bg-black font-sans text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:bg-white dark:text-black"
  >
    <slot name="icon" />
  </Tooltip.Trigger>
  <Tooltip.Content class="bg-black font-sans dark:bg-white" sideOffset={6}>
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

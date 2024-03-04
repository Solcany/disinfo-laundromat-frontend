<script lang="ts">
  import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Root openDelay={0} {...$$restProps}>
  <Tooltip.Trigger
    class="border-border-input bg-white  shadow-btn ring-dark 
  hover:bg-muted focus-visible:ring-dark focus-visible:ring-offset-background inline-flex size-5 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-black shrink-0"
  >
  <slot name="icon"/>
  </Tooltip.Trigger>
  <Tooltip.Content class="bg-white" sideOffset={8}>
    <div class="bg-white">
      <Tooltip.Arrow class="border-dark-10 rounded-[2px] border-l border-t" />
    </div>
    <div
      class="rounded-input border-dark-10 bg-background shadow-popover flex items-center justify-center border p-3 text-sm font-medium outline-none">
      <slot name="content"/>
    </div>
  </Tooltip.Content>
</Tooltip.Root>

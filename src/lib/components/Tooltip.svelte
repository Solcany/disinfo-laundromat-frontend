<script lang="ts">
  import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Root openDelay={0}>
  <Tooltip.Trigger
    class="border-border-input bg-background shadow-btn ring-dark ring-offset-background
  hover:bg-muted focus-visible:ring-dark focus-visible:ring-offset-background inline-flex size-10 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  ></Tooltip.Trigger>
  <Tooltip.Content sideOffset={8}>
    <div class="bg-background">
      <Tooltip.Arrow class="border-dark-10 rounded-[2px] border-l border-t" />
    </div>
    <div
      class="rounded-input border-dark-10 bg-background shadow-popover flex items-center justify-center border p-3 text-sm font-medium outline-none"
    >
      <slot />
    </div>
  </Tooltip.Content>
</Tooltip.Root>

<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<Dialog.Trigger
  class={cn(
    'bg-dark text-background shadow-mini hover:bg-dark/95 focus-visible:ring-foreground focus-visible:ring-offset-background active:scale-98 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-input px-[21px] text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    className
  )}
>
  <slot />
</Dialog.Trigger>

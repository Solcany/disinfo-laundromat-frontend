<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<Dialog.Title
  class={cn(
    'flex w-full items-center justify-center text-lg font-semibold tracking-tight',
    className
  )}
  {...$$restProps}
>
  <slot />
</Dialog.Title>

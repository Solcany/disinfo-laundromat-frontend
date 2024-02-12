<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<Dialog.Description class={cn('text-foreground-alt text-sm', className)} {...$$restProps}>
  <slot />
</Dialog.Description>

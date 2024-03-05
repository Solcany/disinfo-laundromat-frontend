<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<Dialog.Overlay class={cn('fixed inset-0 z-50 bg-black/80', className)} {...$$restProps} />

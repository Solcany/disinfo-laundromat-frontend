<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<Dialog.Content
  class={cn(
    'rounded-card-lg shadow-popover fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] border bg-white p-5 outline-none sm:max-w-[490px] md:w-full',
    className
  )}
  {...$$restProps}
>
  <slot />
</Dialog.Content>

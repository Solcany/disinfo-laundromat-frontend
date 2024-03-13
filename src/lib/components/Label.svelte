<script lang="ts">
  import { Label } from 'bits-ui';
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<Label.Root
  class={cn('font-sans font-light text-sm text-black dark:text-white', className)}
  {...$$restProps}
>
  <slot />
</Label.Root>

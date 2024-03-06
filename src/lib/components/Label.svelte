<script lang="ts">
  import { Label } from 'bits-ui';
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<Label.Root class={cn('font-sans font-light text-base dark:text-white text-black', className)} {...$$restProps>
  <slot />
</Label.Root>

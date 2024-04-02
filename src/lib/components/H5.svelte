<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h5 class={cn('font-sans font-bold text-black dark:text-white', className)} {...$$restProps}>
  <slot />
</h5>

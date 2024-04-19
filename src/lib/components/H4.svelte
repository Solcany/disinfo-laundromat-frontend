<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h4
  class={cn('font-sans text-sm font-bold text-black dark:text-white', className)}
  {...$$restProps}
>
  <slot />
</h4>

<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h3
  class={cn('font-sans text-sm font-bold uppercase text-black dark:text-white', className)}
  {...$$restProps}
>
  <slot />
</h3>

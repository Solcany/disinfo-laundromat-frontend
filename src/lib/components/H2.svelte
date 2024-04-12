<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h2
  class={cn('font-sans text-xl md:text-2xl font-normal text-black dark:text-white', className)}
  {...$$restProps}
>
  <slot />
</h2>

<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h1
  class={cn('font-sans text-xl font-light text-black md:text-2xl dark:text-white', className)}
  {...$$restProps}
>
  <slot />
</h1>

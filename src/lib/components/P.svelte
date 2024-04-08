<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<p class={cn('m-0 text-sm text-black dark:text-white', className)} {...$$restProps}>
  <slot />
</p>

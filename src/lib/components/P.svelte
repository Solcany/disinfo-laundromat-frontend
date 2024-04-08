<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<p class={cn('text-sm text-black dark:text-white m-0', className)} {...$$restProps}>
  <slot />
</p>

<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<li class={cn('py-1 text-sm text-black dark:text-white', className)} {...$$restProps}>
  <slot />
</li>

<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<a class={cn('text-black underline dark:text-white', className)} {...$$restProps}> <slot /></a>

<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<li class={cn('text-sm text-black dark:text-white', className)}>
  <slot />
</li>

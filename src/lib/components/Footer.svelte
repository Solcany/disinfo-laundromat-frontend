<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<footer class={cn('w-100', className)}>
  <slot />
</footer>

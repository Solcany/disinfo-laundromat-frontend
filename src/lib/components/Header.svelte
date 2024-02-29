<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<header class={cn('w-100 py-1 flex justify-between', className)}>
  <slot/>
</header>

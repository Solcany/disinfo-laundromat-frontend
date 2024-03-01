<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<header class={cn('w-100 py-3 flex justify-between items-center border-b-2 border-gray3', className)}>
  <slot/>
</header>

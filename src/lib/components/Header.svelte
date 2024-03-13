<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<header
  class={cn('w-100 flex items-center justify-between border-b-2 border-gray4 py-3', className)}
>
  <slot />
</header>

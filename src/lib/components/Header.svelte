<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<header
  class={cn('w-100 flex flex-col justify-between py-3 md:flex-row md:items-center', className)}
>
  <slot />
</header>

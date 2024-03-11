<script lang="ts">
  import { cn } from '$utils';
  export let ariaLabel: string;
  export let onClick: () => void = () => {};
  let className: string | undefined = undefined;
  export { className as class };
</script>

<button
  on:click={onClick}
  aria-label={ariaLabel}
  class={cn(
    'rounded-md text-white shadow hover:bg-gray-700 active:scale-95 inline-flex h-12 items-center justify-center bg-black px-6 text-sm font-semibold active:transition-transform',
    className
  )}
  {...$$restProps}
>
  <slot />
</button>
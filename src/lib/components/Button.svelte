<script lang="ts">
  import { cn } from '$utils';
  export let ariaLabel: string;
  let className: string | undefined = undefined;
  export { className as class };

  export let variant: 'glyph' | 'text'  = 'text';
  
  function variantClasses(variant: string): string {
    switch (variant) {
      case 'glyph':
        return 'h-input w-[35px] rounded-full shrink-0';
      case 'text':
        return 'h-input dark:text-black text-white rounded-input px-3';
      default: 
        return '';
    }
  }
</script>

<button
  on:click
  aria-label={ariaLabel}
  class={cn(
    'flex items-center justify-center shadow-lg dark:bg-white bg-black font-light font-sans text-sm', 
    variantClasses(variant),
    className)}
  {...$$restProps}
>
  <slot />
</button>

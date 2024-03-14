<script lang="ts">
  import { cn } from '$utils';
  export let ariaLabel: string;
  let className: string | undefined = undefined;
  export { className as class };

  export let variant: 'glyph' | 'text'  = 'glyph';
  
  function variantClasses(variant: string): string {
    switch (variant) {
      case 'glyph':
        return 'h-input w-[35px]';
      case 'text':
        return 'h-input dark:text-black text-white rounded-input';
      default: 
        return '';
    }
  }


</script>

<button
  on:click
  aria-label={ariaLabel}
  class={cn(
    'flex items-center justify-center shadow-lg dark:bg-white bg-black {variantClasses(variant)}' ,
    className)}
  {...$$restProps}
>
  <slot />
</button>

<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h3 class={cn('font-sans font-bold uppercase text-black dark:text-white', className)}><slot /></h3>

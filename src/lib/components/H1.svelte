<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h1 class={cn('font-sans text-xl md:text-2xl font-light text-black dark:text-white', className)}><slot /></h1>

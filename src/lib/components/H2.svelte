<script lang="ts">
  import { cn } from '$utils';
  let className: string = '';
  export { className as class };
</script>

<h2 class={cn('font-sans font-bold text-xl text-black dark:text-white', className)}><slot/></h2>


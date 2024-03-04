<script lang="ts">
  import { cn } from '$utils';
  let className : string | undefined = undefined;
  export {className as class}
</script>

<a class={cn('dark:text-white text-black underline', className)} {...$$restProps}> <slot/></a>

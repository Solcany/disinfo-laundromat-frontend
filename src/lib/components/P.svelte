<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
  
</script>

<p class={cn("dark:text-white text-black text-sm", className)}>
<slot/> 
</p>

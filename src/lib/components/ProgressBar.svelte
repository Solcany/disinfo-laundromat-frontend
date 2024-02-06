<script lang="ts">
  import { onMount } from 'svelte';
  import { Progress } from 'bits-ui';
	import { cn } from '$utils';

	let value = 0;

	let className: string = '';
	export {className as class};
 
  onMount(() => {
    const timer = setTimeout(() => { value = 100; } , 2000);
    return () => clearTimeout(timer);
  });
</script>
 
<Progress.Root
  {value}
  max={100}
  class={cn("relative h-[15px] w-screen overflow-hidden shadow-mini-inset", className)}
>
  <div
    class="absolute h-full w-full flex-1 bg-blue-500 shadow-mini-inset transition-all duration-500 ease-linear"
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (100 ?? 1)}%)`}
  />
</Progress.Root>

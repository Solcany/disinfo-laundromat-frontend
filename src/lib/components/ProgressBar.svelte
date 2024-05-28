<script lang="ts">
  import { onMount } from 'svelte';
  import { Progress } from 'bits-ui';
  import { cn } from '$utils';
  import { loadingStore } from '$stores/loading.ts';

  let progressValue = 100; // 0;
  let isLoading = false;

  let className: string = '';
  export { className as class };

  let value = 0;
  let set = true;
  onMount(() => {
    //timer = 100;
    const interval = setInterval(()=> {
      console.log("tick");
      if(set) {
        value = 0;
        set = !set;
      } else {
        value = 100;
        set = !set;
      }
    }, 1500)
    //const timer = setTimeout(() => (value = 100), 1000);
    //return () => clearTimeout(timer);
  });

</script>

{#if true}
  <Progress.Root
    value={value}
    max={100}
    class={cn('absolute left-0 top-0 w-full h-[5px] overflow-hidden', className)}
  >
    <div
      class="absolute h-full w-screen flex-1 bg-blue-500 transition-all duration-1000 ease-linear"
      style={`transform: translateX(-${
          100 - (100 * (value ?? 0)) / (100 ?? 1)
          }%)`}
    />
  </Progress.Root>
{/if}

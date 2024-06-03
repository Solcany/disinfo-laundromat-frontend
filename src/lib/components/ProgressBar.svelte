<script lang="ts">
  import { cn } from '$utils';
  import { loadingStore } from '$stores/loading.ts';
  import { Progress } from "bits-ui";
  let className: string = '';
  export { className as class };

  let running: boolean = false;
  let updater: ReturnType<typeof setInterval> | null = null;
  let completed = false;
  let intervalTime = 600;
  let maximum = 0.9;
  let stepSizes = [0.01, 0.02];
  let hideAfterCompleteTime = 300;
  let resetAfterCompleteTime = 1000;
  
  let width: number = 0;

  function getIncrement(n: number)  {
    if (n >= 0 && n < 0.2) return 0.1;
    else if (n >= 0.2 && n < 0.5) return 0.04;
    else if (n >= 0.5 && n < 0.8) return 0.02;
    else if (n >= 0.8 && n < 0.99) return 0.005;
    return 0;
  };

  function reset ()  {
    width = 0.08;
    running = true;
  };

  function start () {
    reset();
    animate();
  };

  export const animate = () => {
    if (updater) {
      clearInterval(updater);
    }
    running = true;
    updater = setInterval(() => {
      const step = getIncrement(width) ;
      if (width < maximum) {
        width = width + step;
      }
      if (width > maximum) {
        width = maximum;
        stop();
      }
    }, intervalTime);
  };

  function stop(){
    if (updater) {
      clearInterval(updater);
    }
  };

  function complete() {
    if (updater) {
      clearInterval(updater);
    }
    if (!running) return;
    width = 1;
    running = false;
    setTimeout(() => {
        // hide timer
        completed = true;
        setTimeout(() => {
            // reset the timer
            completed = false;
            width = 0;
            }, resetAfterCompleteTime);
        }, hideAfterCompleteTime);
  };

  $: if(!running && $loadingStore) {
    start()
  } else if(running && !$loadingStore) {
    //complete();
  } 
</script>

{#if !completed}  
  <Progress.Root
    value={width}
    max={100}
    class={cn('absolute left-0 top-0 w-full h-[10px] overflow-hidden', className)}
  >
    <div
      class="absolute h-full bg-blue-500 transition-all duration-300"
      style={`width: ${width * 100}%;`}      />
  </Progress.Root>
{/if}

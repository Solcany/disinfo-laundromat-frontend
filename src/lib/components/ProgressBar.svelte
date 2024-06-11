<script lang="ts">
  import { cn } from '$utils';
  import { loadingStore } from '$stores/loading.ts';
  import { Progress } from 'bits-ui';
  let className: string = '';
  export { className as class };

  const timeUntilMaximum = 20000;
  const intervalTime = 20;
  const numberOfSteps = timeUntilMaximum / intervalTime;
  const maximum = 0.95;
  const intervalStep = maximum / numberOfSteps;
  const hideAfterCompleteTime = 300;
  const resetAfterCompleteTime = 1000;

  let updater: ReturnType<typeof setInterval> | null = null;
  let running: boolean = false;
  let completed = false;
  let width: number = 0.0;

  function reset() {
    width = 0.0;
    running = true;
  }

  function start() {
    reset();
    animate();
  }

  export const animate = () => {
    if (updater) {
      clearInterval(updater);
    }
    running = true;
    updater = setInterval(() => {
      if (width < maximum) {
        width += intervalStep;
      }
      if (width > maximum) {
        width = maximum;
        stop();
      }
    }, intervalTime);
  };

  function stop() {
    if (updater) {
      clearInterval(updater);
    }
  }

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
  }

  $: if (!running && $loadingStore) {
    start();
  } else if (running && !$loadingStore) {
    complete();
  }
</script>

{#if !completed}
  <Progress.Root
    value={width}
    max={100}
    class={cn('absolute left-0 top-0 h-[7px] w-full overflow-hidden', className)}
  >
    <div class="absolute h-full bg-blue-500" style={`width: ${width * 100}%;`} />
  </Progress.Root>
{/if}

<script lang="ts">
  import Particles, { particlesInit } from "@tsparticles/svelte";
  import { loadSlim } from '@tsparticles/slim';
  import { cn } from '$utils';
  import { CANVAS_PARTICLES_CONFIG } from '$config';
  import { isParticlesEngineLoadedStore } from '$stores/particlesEngine.ts';

  let className: string | undefined = undefined;
  export { className as class };

  void particlesInit(async (engine: any) => {
    if (!$isParticlesEngineLoadedStore) {
      await loadSlim(engine);
      isParticlesEngineLoadedStore.set(true);
    }
  });
</script>

<Particles class={cn('', className)} options={CANVAS_PARTICLES_CONFIG} />

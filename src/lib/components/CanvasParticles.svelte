<script lang="ts">
    import Particles, { particlesInit } from '@tsparticles/svelte';
    import { loadSlim } from '@tsparticles/slim';
    import { cn } from '$utils';
    import { CANVAS_PARTICLES_CONFIG } from '$config';

    let className: string | undefined = undefined;
    export { className as class} 

    void particlesInit(async (engine: any) => {
        await loadSlim(engine);
    });
</script>

<Particles
        class={cn("", className)}
        options={CANVAS_PARTICLES_CONFIG}
/>

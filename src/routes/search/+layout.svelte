<script>
  import '../../app.pcss';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
</script>

<div class="relative flex min-h-screen w-full flex-col">
HELLO WORLD
  <ProgressBar class="absolute left-0 top-0" />
  <Header class="px-3 md:px-16" />
  <slot />
  <Footer class="mt-auto px-3 md:px-16" />
</div>

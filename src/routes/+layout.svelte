<script>
  import '../app.pcss';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
</script>

<Header/>
<main class="relative flex min-h-screen w-full flex-col">
    <ProgressBar class="absolute left-0 top-0" />
    <slot />
</main>
<Footer/>

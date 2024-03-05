<script>
  import '../styles/app.pcss';
  import '../styles/fonts.css';
  import { APP_TITLE } from '$config';
  import Header from '$components/Header.svelte';
  import H1 from '$components/H1.svelte';
  import Nav from '$components/Nav.svelte';
  import Footer from '$components/Footer.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
</script>

<Header class="px-2 md:px-3">
  <H1><a href="/">{APP_TITLE}</a></H1>
  <Nav />
</Header>
<main class="border-box relative flex min-h-screen w-full flex-col bg-white dark:bg-gray1">
  <ProgressBar class="absolute left-0 top-0" />
  <slot />
</main>
<Footer />

<script>
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
  import { page } from '$app/stores';
  // WIP: highlight current page tab
  // console.log($page.route.id);
</script>

<nav class="outline outline-1">
  <ul class="flex w-full">
    <li class="px-3"><a href="./url"> Url </a></li>
    <li class="px-3"><a href="./content"> Content </a></li>
    <li class="px-3"><a href="./metadata"> Metadata </a></li>
  </ul>
</nav>
<slot />

<script ts="lang">
import Label from '$components/Label.svelte';
import InputText from '$components/InputText.svelte';
</script>

<main class="w-full">
	<nav class="bg-purple-500"> 
		<ul class="w-full flex">
			<li><a href="."> Content </a></li>
			<li><a href="."> Url </a></li>
			<li><a href="."> Metadata </a></li>
		</ul>
	</nav>

	<div class="grid grid-cols-1 md:grid-cols-2">

		<!-- search bar nav -->	

		<section class="w-full h-[400px] bg-yellow-500">
				<!-- toolbar --> 
				<h2> Content Similarity </h2>
				<div>
					<Label for="content-input"> Content </Label>	
					<InputText id="content-input" name="content input"/>
				</div>

		</section>

		<section class="w-full h-[400px] bg-pink-500">

			<div>
				<!-- searched term bar-->
			</div>

			<div>
				<!-- result table-->
			</div>
		</section>

	</div>
</main>

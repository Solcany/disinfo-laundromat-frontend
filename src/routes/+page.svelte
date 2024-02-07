<script lang="ts">
	import { onMount } from 'svelte'; 
	import { get } from 'svelte/store'; 
	import TabsRoot from '$components/TabsRoot.svelte';
	import TabsList from '$components/TabsList.svelte';
	import TabsTrigger from '$components/TabsTrigger.svelte';
	import TabsContent from '$components/TabsContent.svelte';
	import DropdownSelect from '$components/DropdownSelect.svelte';
	import DropdownSelectItem from '$components/DropdownSelectItem.svelte';
	import TextArea from '$components/TextArea.svelte';
	import { Label } from 'bits-ui';
	import type { FormData, LabeledValue } from '$types';
	import {region_data, language_data, browser_data} from '$dummy_data';	
  import { formDataStore } from '$stores/form.ts';


	let formData : FormData;

	const unsubscribe = formDataStore.subscribe((data : FormData) => formData = data);

	function handleSubmit() {
		formDataStore.set(formData);	
	}

	onMount(()=> {
		return() => {
			unsubscribe();
		};
	});


</script>

<main class="w-100">
	<section class="grid grid-rows-2 gap-4">
		<div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="bg-blue-300">Explanation</div>
			<div class="">
				<TabsRoot value="content similarity">
					<TabsList>
						<TabsTrigger value="content similarity">Content similarity</TabsTrigger>
						<TabsTrigger value="metadata similarity">Metadata similarity</TabsTrigger>
					</TabsList>
					<TabsContent value="content similarity">
						<p>
							Search for similar content shared across the internet. Laundromat uses popular search
							engines to find related websites. Discover networks of malicious actors/websites
							collectively sharing disinformation.
						</p>
						<form on:submit|preventDefault={handleSubmit}>
							<div class="flex">
								<div> 
									<Label.Root for="content">Content</Label.Root>
									<TextArea 
										name="content" 
										bind:value={formData.content}
										required/>
								</div>
								<button type="submit">Submit</button>
							</div>

							<DropdownSelect
								name="region"
								items={region_data}
								bind:value={formData.region}
								required>
								{#each region_data as item}
									<DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
								{/each}
							</DropdownSelect>

							<DropdownSelect
								name="language"
								bind:value={formData.language}
								required
							>
								{#each language_data as item}
									<DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
								{/each}
							</DropdownSelect>

							<DropdownSelect
								name="browser"
								bind:value={formData.browser}
								multiple={true}
								required
							>
								{#each browser_data as item}
									<DropdownSelectItem value={item.value} label={item.label}></DropdownSelectItem>
								{/each}
							</DropdownSelect>

							<form></form>
						</form>
						<a href="search"> advanced search </a>
						</TabsContent>
					<TabsContent value="metadata similarity">test 2 test 2</TabsContent>
				</TabsRoot>
			</div>
		</div>
		<div>
			<Label.Root for="use case list" class="bg-green-300">Label!</Label.Root>
			<ul id="use case list" class="grid grid-cols-1 gap-x-4 md:grid-cols-3">
				<li class="bg-pink-500">test1</li>
				<li class="bg-pink-500">test2</li>
				<li class="bg-pink-500">test3</li>
			</ul>
		</div>
	</section>
</main>

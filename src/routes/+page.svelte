<script lang="ts">
  import { goto } from '$app/navigation';
  import Tabs from '$components/Tabs.svelte';
  import Form from '$components/Form.svelte';
  import Label from '$components/Label.svelte';
  import { Content, type ResponseData, type ApiResponse } from '$models';
  import { CONTENT_PAGE_FORM_CONFIG } from '$config';
  import { parseUrl } from '$api';
  import { inputStore } from '$stores/input';
  import { loadingStore } from '$stores/loading';
  import { contentStore } from '$stores/content';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    inputStore.set(formData);
    let response: ApiResponse<any> = await parseUrl(formData);
    if (response.error) {
      console.log(response.error);
    } else {
      let content = new Content(response.data as ResponseData);
      contentStore.set(content);
      loadingStore.set(false);
      goto('/search/url');
    }
  }
</script>

<section class="grid grid-rows-2 gap-4">
  <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="w-100 flex items-center justify-items-center justify-center">
      <h1 class="w-[300px] font-sans font-light text-xl dark:text-white text-black">
  Uncover mirror websites. Understand content laundering. Safeguard content authenticity online. 
      </h1>
    </div>
    <div class="">
      <Tabs value="content similarity" class="outline outline-1" let:C>
        <C.List>
          <C.Trigger value="content similarity">Content similarity</C.Trigger>
          <C.Trigger value="metadata similarity">Metadata similarity</C.Trigger>
        </C.List>
        <C.Content value="content similarity">
          <p>
            Search for similar content shared across the internet. Laundromat uses popular search
            engines to find related websites. Discover networks of malicious actors/websites
            collectively sharing disinformation.
          </p>
          <Form config={CONTENT_PAGE_FORM_CONFIG} onSubmit={handleSubmit} />
          <a href="search"> advanced search </a>
        </C.Content>
        <C.Content value="metadata similarity">test 2 test 2</C.Content>
      </Tabs>
    </div>
  </div>
  <div>
    <ul id="use case list" class="grid grid-cols-1 gap-x-4 md:grid-cols-3">
      <li class="font-sans dark:text-white text-black">
      <h2 class="font-sans font-base text-lg"> Prove content laundering from state-owned outlets </h2>
      <p class="font-sans font-light text-sm"> Researchers from two European Universities, supported by the Alliance for Securing Democracy, reveal evidence of a small network operating in Poland and Germany that launders Russian state media content into the media mainstream. A sample of articles from problematic outlets, criticizing Ukraine President Zelensky was run through the Laundromat’s Content Search. The tool revealed that all the articles in the sample were lifted from Ria Novosti, an outlet belonging to the Russia Segodnya group. Read the report. </p>
      </li>
      <li class="font-sans dark:text-white text-black">
      <h2 class="font-sans font-base text-lg"> Find proxy websites that exist to overcome DNS bans </h2>
      <p class="font-sans font-light text-sm"> Both Russia Today and Sputnik News sites are currently subjected to DNS bans imposed by the European Commission. However, despite these restrictions, each site employs sophisticated techniques to reach audiences in Member Countries. Read the report to learn how researchers were able to utilize the Laundromat's website fingerprinting service to map the entire network of Russia Today proxy websites, using altered or entirely new domain names. </p>
      </li>
      <li class="font-sans dark:text-white text-black">
      <h2 class="font-sans font-base text-lg"> Tell if a site produces original content </h2>
      <p class="font-sans font-light text-sm"> Content laundering occurs when individuals or entities replicate website content without proper attribution and, in some cases, authorization. This method is commonly employed by disinformation operatives to disseminate problematic content and political propaganda efficiently. The Laundromat tool serves as an effective means to detect duplicate content online and substantiate instances of content plagiarism. See how to use the Laundromat for proving gaps in editorial transparency. Read the guide. </p>
      </li>
    </ul>
  </div>
</section>

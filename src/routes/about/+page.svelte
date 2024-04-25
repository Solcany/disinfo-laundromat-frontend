<script lang="ts">
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';
  import H5 from '$components/H5.svelte';
  import P from '$components/P.svelte';
  import Link from '$components/Link.svelte';
</script>
<svelte:head>
  <meta name="title" content="Information Laundromat - About"/>
</svelte:head>

<div class="my-6 w-full px-3 md:w-1/3 md:px-8">
  <H1 id="about">About</H1>
  <section class="pt-8">
    <H2 class="pb-4" id="the-laundromat">The Laundromat</H2>
    <P class="pb-2">
      The laundromat tool provides two functions: Content Similarity Search and Domain Forensics
      Matching:
    </P>
    <ul class="list-inside list-disc">
      <li class="text-black dark:text-white">
        <P class="inline">
          Content Similarity Search attempts to detect URLs where a given text snippet occurs. It
          does not provide evidence of where that text originated or any relationship between two
          entities posting two similar texts. Detemination of a given text&#39;s provenance is
          outside the scope of this tool.
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Domain Forensics Matching attempts to find aspects of a website which indicate what makes
          it unique, give insight into its architecture/design, or show how its used/tracked. These
          indicators are compared for items with high degrees of similarity and matches are provided
          to the user
        </P>
      </li>
    </ul>

    <H3 class="py-4" id="the-domain-forensics-comparison-corpus"
      >The Domain Forensics Comparison Corpus</H3
    >
    <P class="pb-2">
      Any URLs entered into the Domain Forensics Matching tool are compared against against a list
      of domains already processed by the tool. This corpus is sourced from a number of sources,
      including:
    </P>
    <ul class="list-inside list-disc">
      <li class="text-black dark:text-white">
        <P class="inline">
          <Link href="https://euvsdisinfo.eu/disinformation-cases/"
            >EU vs Disinfo&#39;s Database</Link
          >
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Research from partner and related organizations, such as <Link
            href="https://isdglobal.org/digital_dispatches/rt-articles-are-finding-their-way-to-european-audiences-but-how/"
            >ISD&#39;s report on RT Mirror Sites</Link
          >
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Known <Link href="https://github.com/ASD-at-GMF/state-media-profiles"
            >state media sites</Link
          >
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Lists of <Link href="https://iffy.news/pink-slime-fake-local-news/">pink slime sites</Link
          > and
          <Link href="https://www.midwestradionetwork.com/">faux local news sites</Link>
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Wikipedia&#39;s list of <Link
            href="https://en.wikipedia.org/wiki/List_of_fake_news_websites">fake news websites</Link
          >
          and Wikidata&#39;s
          <Link
            href="https://www.wikidata.org/w/index.php?title=Special:WhatLinksHere/Q17232649&amp;limit=50&amp;dir=next&amp;offset=0%7C3014523"
            >list of news websites</Link
          >
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          At our own discretion, user-input sites. (As of March 2024, no user input sites are
          included)
        </P>
      </li>
    </ul>

    <P class="pb-2">
      Inclusion in the corpus of comparison sites is neither an endorsement nor a criticism of a
      given website&#39;s point of view or their relationship to any other member of the corpus. It
      solely reflects what websites are of interest to OSINT researchers. If you&#39;d like a
      website removed from the list or have a potential list of new items to include, email pbenzoni
      (at) gmfus.org
    </P>
  </section>
  <section class="pt-8">
    <H2 class="pb-4" id="how-to-use-the-laundromat">How to use the Laundromat</H2>
    <H3 class="pb-4" id="content-similarity-search">Content Similarity Search</H3>
    <P class="pb-2">
      Content Similarity Search takes a given title and/or content and uses <Link
        href="https://www.gdeltproject.org/">GDELT</Link
      >, a variety of search services, and a plagiarism checker to detect urls with some degree of
      similarity of the provided content.
    </P>
    <H4 class="py-4" id="url-search">URL Search</H4>
    <P class="pb-2">
      Enter the full URL of an article or webpage (e.g. <Link
        href="https://tech.cnn.com/article-title.html">https://tech.cnn.com/article-title.html</Link
      >
      or
      <Link href="https://www.rt.com/russia/588284-darkening-prospects-ukraine-postwar/"
        >https://www.rt.com/russia/588284-darkening-prospects-ukraine-postwar/</Link
      >) to automatically attempt to extract title and content
    </P>
    <H4 class="py-4" id="advanced-title-content-search">Advanced (Title/Content) Search</H4>
    <P class="pb-2">
      This search allows users to specify the title and content (and apply boolean ANDs/ORs to the
      title and content). It also requires specifying a country and language to search in. As not
      all languages and countries are supported by each service, these will default to US and
      English if unsupported. Finally, users may specify which search engines they want to use for
      their search.
    </P>
    <P class="pb-2">
      This will produce a searchable list of links, their domains, possible associations with known
      lists, the title and snippet, the search engines where that link will be found, and the
      percentage of the title or snippet which matches the provided inputs as determined by the <Link
        href="https://en.wikipedia.org/wiki/Gestalt_pattern_matching"
        >Ratcliff/Obershelp algorithm.</Link
      >.
    </P>
    <H3 class="py-4" id="domain-forensics-matching">Domain Forensics Matching</H3>
    <P class="pb-2">
      This search, which will accept a list of one or more <Link
        href="https://en.wikipedia.org/wiki/Fully_qualified_domain_name"
        >fully qualified domain names.</Link
      > (including a prepended https:// on each domain name). This will produce a list of indicators
      and a list of sites which match (or are extremely similart to) those indicators. Indicators, and
      thus matches, are broken into the three tiers described above.
    </P>
  </section>

  <section class="pt-8">
    <H2 class="py-4" id="partners-sponsors-disclaimers">Partners, Sponsors, Disclaimers</H2>
    <P class="pb-2">
      The Laundromat Tool is made possible with the support of European Media and Information Fund
      (EMIF).
      <Link href="https://gulbenkian.pt/emifund/" class="my-6 block"
        ><img
          src="https://cdn.gulbenkian.pt/emifund/wp-content/uploads/sites/51/2021/10/2_Logo_white-1.svg"
          alt="MJRC Logo"
          class="h-12"
        /></Link
      >
      The Information Laundromat Tool is built a partnership of the Alliance for Securing Democracy (ASD),
      the Institute for Strategic Dialogue (ISD), and the University of Amsterdam (UvA) through the Digital
      Methods Institute.
    </P>

    <H2 class="py-4" id="disclaimers">Disclaimers</H2>
    <H3 class="py-4" id="opinions-disclaimer">Opinions Disclaimer</H3>
    <P class="pb-2">
      The sole responsibility for any content supported by the European Media and Information Fund
      lies with the author(s) and it may not necessarily reflect the positions of the EMIF and the
      Fund Partners, the Calouste Gulbenkian Foundation and the European University Institute.
    </P>
    <H3 class="py-4" id="gdpr-disclaimer">GDPR Disclaimer</H3>
    <P class="pb-2">
      The Information Laundromat tool is committed to protecting and respecting your privacy in
      compliance with the General Data Protection Regulation (GDPR). This disclaimer outlines the
      nature of the data processing activities conducted by our tool and your rights as a data
      subject.
    </P>
    <H4 class="py-4" id="data-collection-and-use">Data Collection and Use</H4>
    <P class="pb-2">
      The Information Laundromat tool collects data through two forms, as part of its functions:
      Content Similarity Search and Domain Forensics Matching.
    </P>
    <ul class="list-inside list-disc">
      <li class="text-black dark:text-white">
        <P class="inline pb-2">
          <strong>Content Similarity Search</strong>: This function processes URLs and text snippets
          provided by the user to detect occurrences of the given text across various websites. It
          is important to note that the provenance of the text and the relationship between entities
          posting similar texts are not determined by this tool.
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline pb-2">
          <strong>Domain Forensics Matching</strong>: This function processes a domain URL and
          analyzes aspects of website architecture, design, and usage to identify unique indicators.
          It compares these indicators across websites to find high degrees of similarity and
          provides indicators and match results to the user.
        </P>
      </li>
    </ul>
    <H4 class="py-4" id="purpose-of-processing">Purpose of Processing</H4>
    <P class="pb-2">
      The form data and results are collected and are solely used for the purpose of usage analytics
      and potential corpus expansion.
    </P>
    <H4 class="py-4" id="data-subject-rights">Data Subject Rights</H4>
    <P class="pb-2">
      Under GDPR, you have various rights concerning the processing of your personal data,
      including:
    </P>
    <ul class="list-inside list-disc text-black dark:text-white">
      <li class="text-black dark:text-white">
        <P class="inline">The right to access your personal data.</P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">The right to rectification if your data is inaccurate or incomplete.</P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline"
          >The right to erasure of your data (&quot;the right to be forgotten&quot;).</P
        >
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">The right to restrict processing of your data.</P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">The right to data portability.</P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">The right to object to data processing.</P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">The right to lodge a complaint with a supervisory authority.</P>
      </li>
    </ul>
    <P class="pb-2">
      Please note that exercising some of these rights may impact the functionality of the tool in
      relation to your use.
    </P>
    <H4 class="py-4" id="data-security-and-retention">Data Security and Retention</H4>
    <P class="pb-2">
      We implement appropriate technical and organizational measures to ensure a level of security
      appropriate to the risk of the data processing activities. Data is retained only for as long
      as necessary for the purposes for which it was collected.
    </P>
    <H4 class="py-4" id="contact-information">Contact Information</H4>
    <P class="pb-2">
      For any inquiries or requests regarding your data rights, please contact our data protection
      officer at pbenzoni (at) gmfus.org.
    </P>
    <H4 class="py-4" id="consent">Consent</H4>
    <P class="pb-2">
      By using the Information Laundromat tool, you acknowledge that you have read this disclaimer
      and agree to the processing of your data as described herein. If you do not agree with these
      terms, please do not use the tool.
    </P>
    <P class="pb-2">
      This disclaimer is subject to updates and modifications. Users are encouraged to review it
      periodically.
    </P>
  </section>
</div>

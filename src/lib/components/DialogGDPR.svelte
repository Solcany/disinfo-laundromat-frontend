<script lang="ts">
import Dialog from "$components/Dialog.svelte";
import H3 from "$components/H3.svelte";
import H4 from "$components/H4.svelte";
import P from "$components/P.svelte";
</script>

<Dialog let:C open={true}>
  <C.Portal>
    <C.Overlay />
    <C.Content>
      <C.Title>GDPR Compliance Notice</C.Title>
      <C.Description>
      <P> 
      The Information Laundromat tool is committed to protecting and respecting your privacy in compliance with the General Data Protection Regulation (GDPR). This disclaimer outlines the nature of the data processing activities conducted by our tool. Selecting 'Accept' consents to the data collection
      </P>
      <H3>
      Data Collection and Use
      </H3>
      <P>
      The Information Laundromat tool collects data through two forms, as part of its functions: Content Similarity Search and Domain Forensics Matching.
      </P>
      <br>

      <H4>
      Content Similarity Search 
      </H4>
      <P>
      This function processes URLs and text snippets provided by the user to detect occurrences of the given text across various websites.
      </P>
      <H4>
      Domain Forensics Matching
      </H4>
      <P>
      This function processes a domain URL and analyzes aspects of website architecture, design, and usage to identify unique indicators.
      </P>
      <P>
      Additional data—IPs, pages visited, and time of visit—are collected automatically as part of website analytics and logging. Logs are deleted after 30 days and analytics are anonymized.
      </P>
      <H4>
      Purpose of Processing
      </H4>
      <P>
      The form data and results are collected and are solely used for the purpose of usage analytics and potential corpus expansion.
      </P>
      </C.Description>
      <C.Close>X</C.Close>
    </C.Content>
  </C.Portal>
</Dialog>

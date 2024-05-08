<script lang="ts">
  import { onMount } from 'svelte';
  import Dialog from '$components/Dialog.svelte';
  import H2 from '$components/H2.svelte';
  import H4 from '$components/H4.svelte';
  import P from '$components/P.svelte';
  import Button from '$components/Button.svelte';
  import { X } from 'phosphor-svelte';

  type Consent = 'accepted' | 'rejected';
  let showGDPRModal = true;

  function handleConsent(consent: Consent) {
    //localStorage.setItem('gdprConsent', consent);
    closeDialog();
  }

  function closeDialog() {
    showGDPRModal = false;
  }

  onMount(() => {
    const consent = localStorage.getItem('gdprConsent');
    if (consent) {
      showGDPRModal = false;
    }
  });
</script>

<Dialog let:C open={showGDPRModal}>
  <C.Portal>
    <C.Overlay />
    <C.Content class="rounded-input border-gray4 dark:bg-gray7">
      <div class="flex items-center justify-center">
        <C.Title><H2>GDPR Compliance Notice</H2></C.Title>
        <Button ariaLabel="close GDPR modal" on:click={closeDialog}>
          <X size={26} color="#ffffff" weight="bold" /></Button
        >
      </div>
      <C.Description>
        <P>
          The Information Laundromat tool is committed to protecting and respecting your privacy in
          compliance with the General Data Protection Regulation (GDPR). This disclaimer outlines
          the nature of the data processing activities conducted by our tool. Selecting 'Accept'
          consents to the data collection
        </P>
        <H4>Data Collection and Use</H4>
        <P>
          The Information Laundromat tool collects data through two forms, as part of its functions:
          Content Similarity Search and Domain Forensics Matching.
        </P>
        <br />

        <H4>Content Similarity Search</H4>
        <P>
          This function processes URLs and text snippets provided by the user to detect occurrences
          of the given text across various websites.
        </P>
        <H4>Domain Forensics Matching</H4>
        <P>
          This function processes a domain URL and analyzes aspects of website architecture, design,
          and usage to identify unique indicators.
        </P>
        <P>
          Additional data—IPs, pages visited, and time of visit—are collected automatically as part
          of website analytics and logging. Logs are deleted after 30 days and analytics are
          anonymized.
        </P>
        <H4>Purpose of Processing</H4>
        <P>
          The form data and results are collected and are solely used for the purpose of usage
          analytics and potential corpus expansion.
        </P>
      </C.Description>
      <div class="flex pt-3">
        <Button class="mr-3" ariaLabel="accept GDPR" on:click={() => handleConsent('accepted')}>
          Accept
        </Button>
        <Button ariaLabel="reject GDPR" on:click={() => handleConsent('rejected')}>Reject</Button>
      </div>
    </C.Content>
  </C.Portal>
</Dialog>

<script lang="ts">
  import type { TableRowData } from '$models';
  import { cn } from '$utils';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: TableRowData;
  let className: string = '';
  export {className as class};

  let domainAssociations = (data.hasOwnProperty('domainAssociations') ? data.domainAssociations : []) as string[];
  let isExpanded = false;
  
  function handleClick() {
    isExpanded = !isExpanded;
  }
</script>
{#if data.data.length > 0}
  <tr class={cn('', className)}>
    <!-- row data -->
    {#each data.data as [key, value]}
      {#if key === 'domain' && domainAssociations.length > 0} 
        <td class="dark:text-white">
          {value}
          {#each domainAssociations as association}
            <Tooltip>
              <svelte:fragment slot="icon">i</svelte:fragment>
              <svelte:fragment slot="content">{association}</svelte:fragment>
            </Tooltip>
          {/each}
        </td>
      {:else}
        <td class="dark:text-white">
          {value}
        </td>
      {/if}
    {/each}
    <!-- expand row button -->
    <td>
      <Button ariaLabel="expand row" onClick={handleClick}>^</Button>
    </td>
  </tr>
  <!-- expanded row data -->
  {#if isExpanded && data.dataComplementary.length > 0}
    <tr>
      <td colSpan={data.data.length}>
        <table class="w-full bg-blue-100">
          <tbody>
            {#each data.dataComplementary as [key, value]}
              <tr>
                <th>
                  {key}
                </th>
              </tr>
              <tr>
                <td>
                  {key}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </td>
    </tr>
  {/if}
{/if}

<script lang="ts">
  // https://www.bits-ui.com/docs/components/tabs
  import { Tabs } from 'bits-ui';
  import type { TabsProps } from 'bits-ui';
  import List from '$components/TabsList.svelte';
  import Trigger from '$components/TabsTrigger.svelte';
  import Content from '$components/TabsContent.svelte';
  import { cn } from '$utils';
  let restProps = $$restProps as TabsProps;
  let className: TabsProps['class'] = '';
  export { className as class };
  export let value: string | undefined = undefined;

  const C = {
    List,
    Trigger,
    Content
  };

</script>

<Tabs.Root bind:value={value} class={cn('w-100', className)} {...restProps}>
  <slot {C} />
</Tabs.Root>

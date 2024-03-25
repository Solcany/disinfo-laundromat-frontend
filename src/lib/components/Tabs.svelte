<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { TabsProps } from 'bits-ui';
  import List from '$components/TabsList.svelte';
  import Trigger from '$components/TabsTrigger.svelte';
  import Content from '$components/TabsContent.svelte';
  import { cn } from '$utils';
  let restProps = $$restProps as TabsProps;
  let className: TabsProps['class'] = '';
  export { className as class };

  const C = {
    List,
    Trigger,
    Content
  };
</script>

<Tabs.Root {...restProps} class={cn('w-100', className)}>
  <slot {C} />
</Tabs.Root>

<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { TabsContentProps } from 'bits-ui';
  import { cn } from '$utils';
  const restProps = $$restProps as TabsContentProps;
  let className: TabsContentProps['class'] = undefined;
  export { className as class };
</script>

<Tabs.Content {...restProps} class={cn('dark:bg-gray7 bg-white p-5', className)}>
  <slot />
</Tabs.Content>

<script lang="ts">
  import { Tabs, type TabsTriggerProps } from 'bits-ui';
  import { cn } from '$utils';

  const restProps = $$restProps as TabsTriggerProps;
  let className: TabsTriggerProps['class'] | undefined = undefined;
  export { className as class };
</script>

<Tabs.Trigger class={cn('flex-1 h-10 py-2 dark:bg-gray6 data-[state=active]:bg-gray7 data-[state=active]:shadow-mini dark:text-white text-black', className)} {...restProps}>
  <slot />
</Tabs.Trigger>

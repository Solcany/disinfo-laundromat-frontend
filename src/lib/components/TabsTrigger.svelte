<script lang="ts">
  import { Tabs, type TabsTriggerProps } from 'bits-ui';
  import { cn } from '$utils';

  const restProps = $$restProps as TabsTriggerProps;
  let className: TabsTriggerProps['class'] | undefined = undefined;
  export { className as class };
</script>

<Tabs.Trigger
  class={cn(
    'data-[state=active]:shadow-mini h-10 flex-1 border-b-[1px] border-r-[1px] border-gray5 py-2 last:border-r-0 data-[state=active]:border-b-0 data-[state=active]:bg-gray7 dark:bg-gray6 dark:text-gray2 data-[state=active]:dark:text-white',
    className
  )}
  {...restProps}
>
  <slot />
</Tabs.Trigger>

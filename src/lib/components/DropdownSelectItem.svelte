<!-- Wrapper component based on https://www.bits-ui.com/docs/components/select -->
<script lang="ts">
  import { Select } from 'bits-ui';
  let value: string;
  let label: string;
  export { value, label };
</script>

<Select.Item
  class="px-2 flex w-full select-none items-center py-2 text-sm outline-none box-border data-[highlighted]:bg-gray1"
  {value}
  {label}
  {...$$restProps}
>
  {label}
  <Select.ItemIndicator class="ml-auto" asChild={false}></Select.ItemIndicator>
</Select.Item>

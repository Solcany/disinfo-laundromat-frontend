<!-- Wrapper component based on https://www.bits-ui.com/docs/components/select -->
<script lang="ts">
  import { Select } from 'bits-ui';
  let value: string;
  let label: string;
  export { value, label };
</script>

<Select.Item
  class="rounded-button flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-red-500"
  {value}
  {label}
  {...$$restProps}
>
  {label}
  <Select.ItemIndicator class="ml-auto" asChild={false}><svg class="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg></Select.ItemIndicator>
</Select.Item> 

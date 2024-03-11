<script lang="ts">
  import { cn } from '$utils';
  export let value: string = '';
  export let id: string;
  export let name: string;
  export let type: string = 'text';
  export let autocomplete: string = '';
  export let required: boolean = false;
  export let placeholder: string = '';
  let className: string = '';
  export { className as class };
</script>

<div class="relative">
  <input
    {id}
    {name}
    {type}
    {autocomplete}
    {required}
    {placeholder}
    {value}
    class={cn('w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500', className)}
  />
  <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
    <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    </svg>
  </div>
</div>
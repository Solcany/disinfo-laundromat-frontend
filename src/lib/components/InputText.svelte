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

<input
  {id}
  {name}
  {type}
  {autocomplete}
  {required}
  {placeholder}
  {value}
  class={cn('px-2 font-sans font-light text-xs h-input w-full truncate rounded-input border bg-white text-sm placeholder:text-gray-6 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 focus:ring-offset-black', className)}
/>

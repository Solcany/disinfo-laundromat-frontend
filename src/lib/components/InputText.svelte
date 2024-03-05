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
  class={cn('', className)}
/>

<script lang="ts">
  import { cn } from '$utils';
  export let id: string;
  export let name: string;
  export let value: string = '';
  export let placeholder: string = '';
  export let rows: number = 3;
  export let cols: number | undefined = undefined;
  export let required: boolean = false;
  export let onInputChange: (value: string, name: string) => void = (
    value: string,
    name: string
  ) => {};
  let className: string = '';
  export { className as class };

  function handleInputChange(event: Event) {
    const { value } = event.target as HTMLTextAreaElement;
    if (onInputChange) {
      onInputChange(value, name);
    }
  }
</script>

<textarea
  bind:value
  {id}
  {name}
  {placeholder}
  {rows}
  {cols}
  {required}
  wrap="soft"
  on:input={handleInputChange}
  class={cn(
    ' h-12 w-full resize-none truncate whitespace-pre-wrap rounded-input border bg-white px-2 font-sans text-base text-black text-white transition-colors duration-200 placeholder:text-gray5 hover:cursor-pointer hover:bg-gray1 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 focus:ring-offset-black',
    className
  )}
/>

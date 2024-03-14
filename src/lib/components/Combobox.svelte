<script lang="ts">
  import { Combobox } from 'bits-ui';
  import { writable } from 'svelte/store';
  import { Check, OrangeSlice, CaretUpDown } from 'phosphor-svelte';

  const fruits = [
    { value: 'mango', label: 'Mango' },
    { value: 'watermelon', label: 'Watermelon' },
    { value: 'apple', label: 'Apple' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'orange', label: 'Orange' }
  ];

  let inputValue = '';

  $: filteredFruits = inputValue
    ? fruits.filter((fruit) => fruit.value.includes(inputValue.toLowerCase()))
    : fruits;

  function handleChange(e: any) {
    inputValue = '';
  }
</script>

<Combobox.Root
  items={filteredFruits}
  bind:inputValue
  onSelectedChange={handleChange}
  loop={true}
  highlightOnHover={true}
>
  <div class="relative">
    <OrangeSlice class="text-muted-foreground absolute start-3 top-1/2 size-6 -translate-y-1/2" />
    <Combobox.Input
      class="rounded-9px border-border-input bg-background placeholder:text-foreground-alt/50 focus:ring-foreground focus:ring-offset-background inline-flex h-input w-[296px] truncate border px-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      placeholder="Search a fruit"
      aria-label="Search a fruit"
    />
    <CaretUpDown class="text-muted-foreground absolute end-3 top-1/2 size-6 -translate-y-1/2" />
  </div>
  <Combobox.Content
    class="border-muted shadow-popover w-full rounded-xl border bg-white px-1 py-3 outline-none"
    sideOffset={8}
  >
    {#each filteredFruits as fruit (fruit.value)}
      <Combobox.Item
        class="rounded-button data-[highlighted]:bg-muted flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75"
        value={fruit.value}
        label={fruit.label}
      >
        {fruit.label}
        <Combobox.ItemIndicator class="ml-auto" asChild={false}>
          <Check />
        </Combobox.ItemIndicator>
      </Combobox.Item>
    {:else}
      <span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
    {/each}
  </Combobox.Content>
  <Combobox.HiddenInput name="favoriteFruit" />
</Combobox.Root>

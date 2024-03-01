<script lang="ts">
  import {cn} from '$utils';
  let className : string = '';
  export {className as class};
</script>

<h1 class={cn('font-sans font-light text-xl dark:text-white text-black', className)}><slot/></h1>


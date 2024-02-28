<script lang="ts">
  import {cn} from '$utils';
  let className : string = '';
  export {className as class};
</script>

<h1 class={cn('font-sans text-xl', className)}><slot/></h1>

<script lang="ts">
    export const prerender = true;
    export const ssr = true;
    
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import DebugThing from '$lib/components/DebugThing.svelte';
    import PlanetDemo from '$lib/demos/PlanetDemo.svelte'

    // import PlanetDemo from "$lib/demos/PlanetDemo.svelte";

    
    function updateDemo(event: KeyboardEvent) { showDemo = `${event.key}` }
    onMount(() => { 
        window.addEventListener('keypress', updateDemo);
        return () => { window.removeEventListener('keypress', updateDemo); }; 
    });

    $: showDemo = "1";
</script>

<!-- <ScrollView> -->
<!-- <div class="" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"> -->
<div class="m-8" style="position: fixed; color: #cbcbcdFF; padding: 32px;">
    {#if showDemo == "0"}
        <span>0</span>
    {:else if showDemo == "1"}
        <PlanetDemo/>
    {:else if showDemo == "2"}
        <!-- <NumberDemo/> -->
    {:else if showDemo == "3"}
        <!-- <EasingDemo/> -->
    {:else if showDemo == "4"}
        <!-- <BezierDemo/> -->
    {/if}
</div>
<!-- </ScrollView> -->


<!-- <DebugThing attach={[0,0]} /> -->
<DebugThing style="position: fixed; top: 8px; right: 8px;" class=""/>
<style lang="postcss">
    :global(.tinytext) { @apply text-[10px] font-pixel text-[#fff] h-[8px] leading-[8px]; }
</style>





<script lang="ts">
    import { onMount } from 'svelte';

    export let text: string | null = null;
    export let size = 128;
    export let attach: number[] | null = null;

    export let events: MouseEvent | null = null;

    let frameCount = 0;
    let mouseStuff = '~4MOUSE|~5READY';
    let keyboardStuff = '~4KEYBOARD|~5READY';
    let frameId = 0;
    $: pos = [0,0]

    // Function to update mouse position
    function updateMouse(event: MouseEvent) {
        events = event;
        pos = [event.pageX, event.pageY]
        const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement
        const e = element ? element.getBoundingClientRect() : undefined; // FIXME: Sometimes this is null
        mouseStuff = `
                ~0document|~4w:~3${document.body.clientWidth.toFixed(2)}|~4h:~3${document.body.clientHeight.toFixed(2)}
                \npage|x:${event.pageX.toFixed(2)}|y:${event.pageY.toFixed(2)}
                screen|x:${event.screenX.toFixed(2)}|y:${event.screenY.toFixed(2)}
                movement|x:${event.movementX.toFixed(2)}|y:${event.movementY.toFixed(2)}
                \n${getElementName(event)}|${isBody(event) ? `~5` : `~3`}mouseevent
                ${isBody(event) ? '~5=|~5=' : `layer|x:${event.layerX.toFixed(2)}|y:${event.layerY.toFixed(2)}`}
                ${isBody(event) ? '~5=|~5=' : `client|x:${event.clientX.toFixed(2)}|y:${event.clientY.toFixed(2)}`}
                ${isBody(event) ? '~5=|~5=' : `offset|x:${event.offsetX.toFixed(2)}|y:${event.offsetY.toFixed(2)}`}
                \n${getElementId(event)}|${isBody(event) ? `~5` : `~3`}dimens
                ${!e || isBody(event) ? `~5w:~5=|~5l:~5=|~5r:~5=` : `~3w:~1${e.width.toFixed(2)}|~3l:~4${e.left.toFixed(2)}|~3r:~4${e.right.toFixed(2)}`}
                ${!e || isBody(event) ? `~5h:~5=|~5t:~5=|~5b:~5=` : `~3h:~1${e.height.toFixed(2)}|~3t:~4${e.top.toFixed(2)}|~3b:~4${e.bottom.toFixed(2)}`}
                `
    }
    function isBody(event: MouseEvent) {
        const name = event.target ? (event.target.toString()).replace(/[\[\]]/g, '').split(' ')[1] : 'none'
        return name.toLowerCase()=='htmlbodyelement'
    }
    function updateKeyDn(event: KeyboardEvent) {
        if (event) ''
        keyboardStuff = `
        key|~0${event.key==' ' ? 'SPACE' : event.key }`
    }
    function updateKeyUp(event: KeyboardEvent) {
        if (event) ''
        keyboardStuff = `
        key|~5${event.key==' ' ? 'SPACE' : event.key }`
    }

    function getElementId(event: MouseEvent): string {
        const e = (document.elementFromPoint(event.clientX, event.clientY) as HTMLElement);
        if (e && e.id !== null && e.id !== '') return `~9${e.id}`;
        else return '~5element'
    }

    function getElementName(event: MouseEvent): string {
        const name = event.target ? (event.target.toString()).replace(/[\[\]]/g, '').split(' ')[1] : 'none'
        // return `${name.toLowerCase()=='htmlbodyelement' ? '~5' : '~0'}${name}|~2FRAME:~2${frameCount}`
        return `${name.toLowerCase()=='htmlbodyelement' ? '~5' : '~0'}${name}`
    }

    function tick() {
        frameCount++;
        frameId = requestAnimationFrame(tick);
    }

    function noSty(input: string) {
        const match = input.match(/~(\d)/);
        return match ? input.replace(/~\d/, '') : input;
    }
    function getSty(input: string) {
        const match = input.match(/~(\d)/);
        return match ? `num${match[1]}` : '';
    }


    let isMouse = false;

    // Set up and tear down event listeners
    onMount(() => { 
        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('mouseover', function(event) { isMouse = true; });
        window.addEventListener('mouseout', function(event) { isMouse = false; });
        window.addEventListener('keydown', updateKeyDn);
        window.addEventListener('keyup', updateKeyUp);
        tick();
        return () => { 
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('mouseover', function(event) { isMouse = true; });
            window.removeEventListener('mouseout', function(event) { isMouse = false; });
            window.removeEventListener('keydown', updateKeyDn);
            window.removeEventListener('keyup', updateKeyUp);
            cancelAnimationFrame(frameId);
        }; 
    });

    $: lines = text !== null ? (text != '' ? text.split('\n') : attach ? '' : '_') : 
    `${mouseStuff}\n${keyboardStuff}`.split('\n');

</script>

<div style="min-width:{text !== null ? size : 192}px;max-width:{text !== null ? size : 192}px;
{attach ? `left:${pos[0]+attach[0]+16}px;top:${pos[1]+attach[1]+24}px;opacity:0.8;`:''}
{attach ? (!isMouse || text == '' ? 'opacity:0;' : '') : ''}
{$$props.style}" class="black-box debugtext {$$props.class}" >
    {#each lines as line}
    {#if line != ''}
        <div class="row">
            {#each line.split('|') as col, i (i)}
                <div class="col {i==0 ? 'justify-items-start text-[#ccc]' : 'justify-items-end'}" style="width:100%">
                    
                    {#if col.includes(':')}
                        <div class="flex justify-between" style="width:100%">
                            {#each col.split(':') as col2, d (d)}
                                <span class="{d == 0 ? 'px-[3px] text-[#32f078]' : ''} {getSty(col2)}">{noSty(col2)}{d==0 ? '' : ''}</span>
                            {/each}
                        </div>
                    {:else}
                        <span class="{getSty(col)}">{noSty(col)}</span>
                    {/if}

                </div>
            {/each}
        </div>
        {/if}
    {/each}
</div>

<style lang="postcss">
    .black-box {
        position: absolute;
        background-color: #444;
        padding: 2px 2px 1px 0px;
        border-radius: 2px;
        height: auto;
        box-sizing: border-box;
    }
    .row {
        @apply flex justify-between;
    }
    .col {
        @apply grid;
        background-color: #000;
        margin: 0px 0px 1px 2px;
        height: 100%;
        padding: 2px 2px;
        box-shadow: 0 0px 0 1px #222;
    }
    .num0 { color: #fff000; }
    .num1 { color: rgba(160, 250, 190, 1.0); }
    .num2 { color: rgba(50, 240, 120, 1.0); }
    .num3 { color: #ccc; }
    .num4 { color: #aaa; }
    .num5 { color: #777; }
    .num6 { color: #f0f; }
    .num7 { color: #f0f; }
    .num8 { color: #f0f; }
    .num9 { color: #33f0ff; }
</style>
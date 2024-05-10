<script lang="ts">
    let styleTest = "box-shadow: 0 0 0 0.3px rgba(255, 240, 0, 1), inset 0 0 0 0.3px rgba(255, 240, 0, 1);";

    // let rangeSliderX: RangeSlider;
    // let rangeSliderY: RangeSlider;
    // let rangeSliderZ: RangeSlider;
    $: surfX = 0.0;
    $: surfY = 0.0;
    $: surfZ = 0.0;

    // $: buttonDisabled = surfX != undefined && surfY != undefined && surfZ != undefined
    //     && rangeSliderX?.isDefault() && rangeSliderY?.isDefault() && rangeSliderZ?.isDefault();

    // function resetIcons() {
    //     rangeSliderX.setValue();
    //     rangeSliderY.setValue();
    //     rangeSliderZ.setValue();
    // }
</script>

HELLO WORLD!

<!-- <PlanetGenerator/> -->

<!-- <div class="flex gap-4 m-4">
    <VectorPlanet/><img src={ogPlanet} alt="" class="h-[256px]" style="border-radius: 50%;"/>
</div>
<div class="flex">
    <MapPlanet/><MapPlanet2/><MapPlanet3/>
</div> -->




<!-- <div class="pt-4">
    <RangeSlider bind:this={rangeSliderX} 
        bind:drivenValue={surfX} min={-1} max={1} decimals={2} step={1}
        title="Surface X" suffix=" offset" fill={false} plus={true}
    />
    <RangeSlider bind:this={rangeSliderY} 
        bind:drivenValue={surfY} min={-1} max={1} decimals={2} step={0.1}
        title="Surface Y" suffix=" offset" plus={true}
    />
    <RangeSlider bind:this={rangeSliderZ} 
        bind:drivenValue={surfZ} min={-1} max={1} decimals={2} step={0.1}
        title="Surface Z" suffix=" offset" fill={false} plus={true}
    />
    <ButtonHD text="RESET" action={resetIcons} disabled={buttonDisabled} class="mt-4 text-xl"/>
</div> -->

<!-- <style lang="postcss">
    .test-title {
		@apply text-2xl;
        color: rgba(50, 240, 120, 0.8);
	}

    @keyframes bgScroll {
        0% {
            background-position : 0px 0px
        }
        100% {
            background-position : -1000px -1000px
        }
    }

    .scrollingBG {
        display:block;
        width:512px;
        height:256px;
        background-image:url("../components/planets/imgs/hd_surface.svg");
        background-size: 512px 256px;
        animation: bgScroll 100s linear infinite;
    }
</style> -->
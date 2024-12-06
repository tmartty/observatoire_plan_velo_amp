<template>
  <div
    class="my-8 relative px-2 pt-8 pb-2 border-2 rounded-xl max-w-2xl mx-auto"
    :style="{ 'border-color': `rgb(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b})` }"
  >
    <div
      class="absolute -top-4 left-0 right-0 w-fit rounded-md px-2 py-1 mx-auto text-center text-lg text-white"
      :style="{ 'background-color': `rgb(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b})` }"
    >
      Typologie des aménagements réalisés
    </div>
    <div
      v-for="(data, index) in doneFeaturesByType"
      :key="index"
      :title="`${totalKms(data)} km`"
      class="grid grid-cols-[1fr_2px_1fr] gap-x-4"
      :style="{ color: `rgb(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b})` }"
    >
      <div class="py-1 font-semibold text-sm sm:text-base text-right leading-tight">
        {{ index }}
      </div>
      <div
        class=""
        :style="{ 'background-color': `rgb(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b})` }"
      />
      <div class="flex items-center">
        <div
          class="grow-1 h-1 sm:h-2 mr-4 rounded-full"
          :style="{
            width: `${totalPercentage(data)}%`,
            'background-color': `rgb(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b})`
          }"
        />
        <div class="shrink-0 text-sm sm:text-base font-semibold">{{ totalPercentage(data) }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useMapStore } from '@/stores/map';
// const { highlightFeatures } = useMap();
const { getDistance } = useStats();

const { features, color } = defineProps({
  features: { type: Array, required: true },
  color: { type: String, required: false, default: '#429ada' }
});

// separate done features by the "typologie" property
const doneFeatures = features.filter(
  feature => feature.properties.statut.includes('Réalisé') && feature.properties.date_realisation
);
let doneFeaturesByType = doneFeatures.reduce((acc, feature) => {
  const type = feature.properties.typologie;
  if (!acc[type]) {
    acc[type] = [];
  }
  acc[type].push(feature);
  return acc;
}, {});

// sort keys
doneFeaturesByType = Object.fromEntries(
  Object.entries(doneFeaturesByType).sort((a, b) => {
    const order = ['Piste cyclable', 'Voie verte', 'Bande cyclable', 'Bande cyclable à hauteur de trottoir'];
    return order.indexOf(a[0]) - order.indexOf(b[0]);
  })
);

const totalMeters = data => {
  return getDistance({ features: data }) / 10;
};
const totalKms = data => {
  return Math.round(totalMeters(data)) / 100;
};
const totalPercentage = data => {
  return Math.round((totalMeters(data) / totalMeters(doneFeatures)) * 100);
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}
</script>

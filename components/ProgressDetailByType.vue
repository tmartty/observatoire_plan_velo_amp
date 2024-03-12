<template>
  <div>
    <h3>Qualité des infrastructures réalisés</h3>
    <div class="max-w-2xl mx-auto bg-gray-200 rounded-full flex overflow-hidden">
      <div
        v-for="(data, index) in doneFeaturesByType"
        class="text-xs font-medium text-white text-center p-1 leading-none cursor-pointer"
        :style="{
          width: `${totalPercentage(data)}%`,
          'background-color': `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, ${
            index === 'Piste cyclable'
              ? 1
              : index === 'Voie verte'
                ? 0.6
                : index === 'Bande cyclable'
                  ? 0.4
                  : index === 'Bande cyclable à hauteur de trottoir'
                    ? 0.2
                    : 0.2
          })`
        }"
        :title="`${index} : ${totalKms(data)} km`"
      >
        {{ totalPercentage(data) }}%
      </div>
    </div>
    <ul>
      <li v-for="(data, index) in doneFeaturesByType" class="text-sm p-1 leading-none">
        {{ totalPercentage(data) }}% {{ index }} ({{ totalKms(data) }} km)
      </li>
    </ul>
  </div>
</template>

<script setup>
// import { useMapStore } from '@/stores/map';
// const { highlightFeatures } = useMap();

const { features, color } = defineProps({
  features: { type: Array, required: true },
  color: { type: String, required: false, default: '#429ada' }
});

// separate done features by the "typologie" property
const doneFeatures = features.filter(feature => feature.properties.statut.includes('Réalisé'));
var doneFeaturesByType = doneFeatures.reduce((acc, feature) => {
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
  return data.reduce((acc, feature) => acc + feature.properties.calculated_length, 0) / 10;
};
const totalKms = data => {
  return Math.round(totalMeters(data)) / 100;
};
const totalPercentage = data => {
  return Math.round((totalMeters(data) / totalMeters(doneFeatures)) * 100);
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

// function highlightFeaturesWithType(type, value) {
//   const map = useMapStore().map;
//   if (!map) return;
//   const features = doneFeaturesByType[type];
//   highlightFeatures({ map, features, value });
// }
</script>

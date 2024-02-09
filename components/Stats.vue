<template>
  <div class="grid grid-cols-2 rounded-lg overflow-hidden shadow bg-gray-200 gap-px md:grid-cols-3">
    <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6 bg-white">
      <div class="flex justify-between">
        <div class="text-base font-normal text-gray-900">
          {{ item.name }}
        </div>
        <div class="text-sm font-semibold text-lvv-blue-600">
          {{ item.percent }}
        </div>
      </div>
      <div class="mt-1 flex justify-between items-baseline md:block lg:flex">
        <div class="flex items-baseline text-2xl font-semibold text-lvv-blue-600">
          {{ item.distance }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getAllUniqLineStrings } = useStats();

const { voies } = defineProps({
  voies: { type: Array, required: true }
});

const features = getAllUniqLineStrings(voies);

const doneFeatures = features.filter(feature => feature.properties.status.includes('Réalisé'));
const workInProgressFeatures = features.filter(feature => feature.properties.status.includes('travaux'));
const missingFeatures = features.filter(feature => feature.properties.status.includes('A réaliser'));

const doneDistance = doneFeatures.reduce((acc, feature) => acc + feature.properties.calculated_length, 0);
const workInProgressDistance = workInProgressFeatures.reduce(
  (acc, feature) => acc + feature.properties.calculated_length,
  0
);
const missingDistance = missingFeatures.reduce((acc, feature) => acc + feature.properties.calculated_length, 0);

function getPercent(distance) {
  return Math.round((distance / (doneDistance + workInProgressDistance + missingDistance)) * 100);
}

const stats = [
  { name: 'Réalisés', distance: `${Math.round(doneDistance / 1000)} km`, percent: `${getPercent(doneDistance)}%` },
  {
    name: 'En travaux',
    distance: `${Math.round(workInProgressDistance / 1000)} km`,
    percent: `${getPercent(workInProgressDistance)}%`
  },
  { name: 'Prévus', distance: `${Math.round(missingDistance / 1000)} km`, percent: `${getPercent(missingDistance)}%` }
];
</script>

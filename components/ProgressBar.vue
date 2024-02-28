<template>
  <div>
    <div class="max-w-2xl mx-auto bg-gray-200 rounded-full flex overflow-hidden">
      <div
        class="bg-cvv-blue-600 text-xs font-medium text-white text-center p-1 leading-none"
        :style="
          alternativeColor
            ? `background-color: ${alternativeColor}; width: ${donePercent}%;`
            : `width: ${donePercent}%;`
        "
      >
        {{ donePercent }}%
      </div>
      <div
        v-if="inProgressPercent > 0 && !alternativeColor"
        class="bg-cvv-blue-400 text-white text-xs font-medium text-center p-1 leading-none"
        :style="
          alternativeColor
            ? `color: ${alternativeColor}; background: ${alternativeColor}; width: ${inProgressPercent}%; min-width: 4%;`
            : `width: ${inProgressPercent}%; min-width: 4%;`
        "
      >
        {{ inProgressPercent }}%
      </div>
    </div>
  </div>
</template>

<script setup>
const { getAllUniqLineStrings } = useStats();

const { voies } = defineProps({
  voies: { type: Array, required: true },
  alternativeColor: { type: String, default: null }
});

const features = getAllUniqLineStrings(voies);

const doneFeatures = features.filter(feature => feature.properties.statut.includes('Réalisé'));
const workInProgressFeatures = features.filter(feature => feature.properties.statut.includes('travaux'));
const missingFeatures = features.filter(feature => feature.properties.statut.includes('A réaliser'));

const doneDistance = doneFeatures.reduce((acc, feature) => acc + feature.properties.calculated_length, 0);
const workInProgressDistance = workInProgressFeatures.reduce(
  (acc, feature) => acc + feature.properties.calculated_length,
  0
);
const missingDistance = missingFeatures.reduce((acc, feature) => acc + feature.properties.calculated_length, 0);

const donePercent = Math.round((doneDistance / (doneDistance + missingDistance)) * 100);
const inProgressPercent = Math.round((workInProgressDistance / (doneDistance + missingDistance)) * 100);
</script>

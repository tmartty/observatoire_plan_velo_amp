<template>
  <div class="h-full w-full flex flex-col">
    <ClientOnly>
      <Map :features="features" :options="{ logo: false }" class="flex-1" />
    </ClientOnly>
    <div>
      <div class="py-2 px-5 md:px-8 text-white bg-cvv-blue-600 font-semibold text-base">
        {{ doneDistance }} km de pistes cyclables réalisés
      </div>
      <div class="py-5 px-5 md:px-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
        <div v-for="filter in filters" :key="filter.label" @click="filter.isChecked = !filter.isChecked">
          <div
            class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none"
            :class="{
              'bg-cvv-blue-600 border-transparent text-white hover:bg-cvv-blue-500': filter.isChecked,
              'bg-white border-gray-200 text-gray-900 hover:bg-gray-50': !filter.isChecked
            }"
          >
            <div>{{ filter.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getAllUniqLineStrings, getDistance } = useStats();
// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  layout: 'fullscreen'
});

const filters = ref([
  { label: 'avant 2019', match: year => year < 2019, isChecked: false },
  { label: 'phase 2019-2023', match: year => year >= 2019 && year < 2024, isChecked: true },
  { label: 'phase 2024-2030', match: year => year >= 2024, isChecked: false }
]);

const { data: lignes } = await useAsyncData(() => {
  return queryContent('lignes').where({ _type: 'json' }).find();
});

const features = computed(() => {
  return lignes.value
    .map(voie => voie.features)
    .flat()
    .filter(feature => feature.properties.statut.includes('Réalisé') && feature.properties.date_realisation)
    .filter(feature =>
      filters.value.some(filter => filter.isChecked && filter.match(Number(feature.properties.date_realisation)))
    );
});

const doneDistance = computed(() => {
  const allUniqFeatures = getAllUniqLineStrings([{ type: 'FeatureCollection', features: features.value }]);
  const doneDistance = getDistance({ features: allUniqFeatures });
  return Math.round(doneDistance / 100) / 10;
});
</script>

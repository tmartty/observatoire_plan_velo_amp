<template>
  <div>
    <div class="space-y-6">
      <dl
        class="mt-5 grid grid-cols-2 rounded-lg bg-white overflow-hidden shadow divide-x divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x"
      >
        <div class="px-4 py-5 sm:p-6">
          <dt class="mt-0 text-base font-normal text-gray-900">Total</dt>
          <dd class="mt-1 pl-0 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold" :style="`color: ${voie.color}`">
              {{ Math.round((doneDistance + missingDistance) / 100) / 10 }} km
            </div>
          </dd>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <dt class="mt-0 text-base font-normal text-gray-900">Réalisés</dt>
          <dd class="mt-1 pl-0 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold" :style="`color: ${voie.color}`">
              {{ Math.round(doneDistance / 100) / 10 }} km
            </div>
          </dd>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <dt class="mt-0 text-base font-normal text-gray-900">Manquants</dt>
          <dd class="mt-1 pl-0 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold" :style="`color: ${voie.color}`">
              {{ Math.round(missingDistance / 100) / 10 }} km
            </div>
          </dd>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <dt class="mt-0 text-base font-normal text-gray-900">Avancement</dt>
          <dd class="mt-1 pl-0 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold" :style="`color: ${voie.color}`">
              {{ percentageComplete }}%
            </div>
          </dd>
        </div>
      </dl>
    </div>
    <section aria-labelledby="shipping-heading" class="mt-10">
      <ClientOnly>
        <Map :features="features" :options="mapOptions" style="height: 40vh" />
      </ClientOnly>
    </section>
    <ProgressDetailByType :features="features" :color="voie.color" class="mt-8" />
  </div>
</template>

<script setup>
const { getDistance } = useStats();
const { path } = useRoute();

const { voie } = defineProps({ voie: Object });

const mapOptions = {
  fullscreen: true,
  onFullscreenControlClick: () => {
    const route = useRoute();
    return navigateTo({ path: `${route.params._ligne}/carte` });
  }
};

const { data: geojson } = await useAsyncData(`geojson-${path}`, () => {
  return queryContent('lignes').where({ _type: 'json', _path: voie._path }).findOne();
});

const features = geojson.value.features;

const doneFeatures = features.filter(
  feature => feature.properties.statut.includes('Réalisé') && feature.properties.date_realisation
);
const missingFeatures = features.filter(feature => feature.properties.statut.includes('A réaliser'));

const doneDistance = getDistance({ features: doneFeatures });
const missingDistance = getDistance({ features: missingFeatures });
const percentageComplete = Math.round((doneDistance / (doneDistance + missingDistance)) * 100);
</script>

<template>
  <div>
    <div class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Le Plan Vélo, c'est quoi ?</h2>
          <p class="mt-3 text-xl text-gray-500 sm:mt-4">
            En 2019, la Métropole s’est engagée dans la mise en œuvre d’un plan vélo sur cinq ans afin de répondre aux
            enjeux de qualité de l’air et de santé publique qui constituent l’un des quatre volets de l’Agenda
            environnemental commun au Département des Bouches-du-Rhône et à la Métropole.
          </p>
        </div>
      </div>
      <div class="mt-10 bg-white">
        <div class="relative">
          <div class="absolute inset-0 h-1/2 bg-white" />
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
              <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Lignes</dt>
                  <dd class="order-1 text-5xl font-extrabold text-cvv-blue-600">8</dd>
                </div>
                <div
                  class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r"
                >
                  <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Distance</dt>
                  <dd class="order-1 text-5xl font-extrabold text-cvv-blue-600">126km</dd>
                </div>
                <div class="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Budget</dt>
                  <dd class="order-1 text-5xl font-extrabold text-cvv-blue-600">35M€</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8 lg:mt-24">
      <div class="space-y-8 sm:space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Où en est le projet ?</h2>
          <p class="text-xl text-gray-500">
            Après une première étape entre 2019 et 2024, nous n'avons vu que la construction de
            {{ firstStageSectionsLength }} kms.
            <br />
            Les travaux devraient être rattrapés lors de la deuxième phase entre 2024-2030.
          </p>
        </div>
      </div>
      <ProgressBar :voies="lignes" class="mt-8 md:mt-10" />
      <Stats :voies="lignes" class="mt-8" />
    </div>
  </div>
</template>

<script setup>
const { getDistance } = useStats();

const { data: lignes } = await useAsyncData(() => {
  return queryContent('lignes').where({ _type: 'json' }).find();
});

const firstStageSections = computed(() => {
  return lignes.value
    .map(voie => voie.features)
    .flat()
    .filter(feature => feature.properties.statut.includes('Réalisé') && feature.properties.date_realisation)
    .filter(
      feature =>
        Number(feature.properties.date_realisation) >= 2019 && Number(feature.properties.date_realisation) < 2024
    );
});

const firstStageSectionsLength = computed(() => {
  const doneDistance = getDistance({ features: firstStageSections.value });
  return Math.round(doneDistance / 100) / 10;
});
</script>

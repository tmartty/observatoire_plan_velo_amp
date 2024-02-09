<template>
  <div class="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8 lg:mt-24">
    <div class="space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl text-center">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Avancement par ligne</h2>
        <p class="text-xl text-gray-500">
          Choisissez une Ligne pour connaitre le détail du projet et voir son niveau d'avancement.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:sm:grid-cols-3">
        <div
          v-for="voie in voies"
          :key="voie.line"
          class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cvv-blue-600"
        >
          <div class="flex-shrink-0">
            <div
              class="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
              :style="`background-color: ${voie.color}`"
            >
              {{ voie.line }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <NuxtLink :to="getVoieLyonnaisePath(voie.line)" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">Ligne {{ voie.line }}</p>
              <p class="text-sm text-gray-500 truncate">{{ voie.from }} → {{ voie.to }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: voies } = await useAsyncData(() => {
  return queryContent('voies-lyonnaises').where({ _type: 'markdown' }).find();
});

function getVoieLyonnaisePath(line) {
  return `/voie-lyonnaise-${line}`;
}
</script>

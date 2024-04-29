<template>
  <ClientOnly>
    <Map :features="features" :options="{ geolocation: true }" class="h-full w-full" />
  </ClientOnly>
</template>

<script setup>
// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  layout: 'fullscreen'
});

const { data: lignes } = await useAsyncData(() => {
  return queryContent('lignes').where({ _type: 'json' }).find();
});

const features = lignes.value.map(ligne => ligne.features).flat();

const description =
  'Découvrez la carte interactive des aménagements cyclables de Marseille. Itinéraires rue par rue. Plan régulièrement mis à jour pour une information complète.';
const COVER_IMAGE_URL = '';
useHead({
  title: 'Carte à jour des lignes du Plan Vélo Métropole Aix-Marseille-Provence',
  meta: [
    // description
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    // cover image
    { hid: 'og:image', property: 'og:image', content: COVER_IMAGE_URL },
    { hid: 'twitter:image', name: 'twitter:image', content: COVER_IMAGE_URL }
  ]
});
</script>

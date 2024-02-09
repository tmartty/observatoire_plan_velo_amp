<template>
  <ClientOnly>
    <Map :features="features" class="h-full w-full" />
  </ClientOnly>
</template>

<script setup>
// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  layout: 'embed'
});

const { data: voies } = await useAsyncData(() => {
  return queryContent('lignes').where({ _type: 'json' }).find();
});

const features = voies.value.map(voie => voie.features).flat();

const description =
  'Découvrez la carte interactive du Plan Vélo Marseillais. Itinéraires rue par rue. Plan régulièrement mis à jour pour une information complète.';
const COVER_IMAGE_URL = '';
useHead({
  title: 'Carte à jour du Plan Vélo Marseillais',
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

<template>
  <ClientOnly>
    <Map :features="voie.features" :options="mapOptions" class="h-full w-full" />
  </ClientOnly>
</template>

<script setup>
const { path } = useRoute();

const regex = /ligne-(1[0-2]|[1-9])\b/;
const line = path.match(regex)[1];

// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  layout: 'fullscreen',
  middleware: 'ligne'
});

const mapOptions = {
  shrink: true,
  onShrinkControlClick: () => {
    const route = useRoute();
    return navigateTo({ path: `/${route.params._ligne}` });
  }
};

const { data: voie } = await useAsyncData(() => {
  return queryContent('lignes')
    .where({ _type: 'json', _path: `/lignes/ligne-${line}` })
    .findOne();
});

const description = `Carte de la Ligne ${line}. Découvrez les tronçons prévus, déjà réalisés, en travaux et ceux reportés après 2026.`;
useHead({
  title: `Carte de la Ligne ${line}`,
  meta: [
    // description
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'twitter:description', name: 'twitter:description', content: description }
  ]
});
</script>

<template>
  <ContentFrame class="pt-8">
    <template #header>
      <h1
        class="text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl text-white rounded-md px-4 py-2"
        :style="`background-color: ${voie.color}`"
      >
        {{ voie.name }}
      </h1>
    </template>
    <Overview :voie="voie" />
    <!-- TODO: re-enable detail on each section -->
    <!-- <ContentRenderer :value="voie" /> -->
  </ContentFrame>
  <AdherezAuCollectif class="pb-10" />
</template>

<script setup>
const { path } = useRoute();

const regex = /ligne-(1[0-2]|[1-9])\b/;
const line = path.match(regex)[1];

// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  middleware: 'ligne'
});

const { data: voie } = await useAsyncData(`${path}`, () => {
  return queryContent('lignes')
    .where({ _type: 'markdown', line: Number(line) })
    .findOne();
});

const description = `Tout savoir sur la  ${voie.value.name}. Avancement, carte interactive, détail rue par rue, calendrier des travaux et photos du projet.`;
const coverImage = voie.value.cover;
useHead({
  title: `${voie.value.name}`,
  meta: [
    // description
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    // cover image
    { hid: 'og:image', property: 'og:image', content: coverImage },
    { hid: 'twitter:image', name: 'twitter:image', content: coverImage }
  ]
});
</script>

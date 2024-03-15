<template>
  <div class="py-8 flex flex-col items-center">
    <!-- link when clicking the image to full size -->
    <a
      href="/images/carte-piste-cyclable-plan-velo.jpg"
      target="_blank"
      rel="noopener noreferrer"
      class="text-center mx-auto"
    >
      <img
        src="/images/carte-piste-cyclable-plan-velo.jpg"
        class="object-contain hover:cursor-zoom-in max-h-[130vh]"
        alt="carte officiel du Plan Vélo Métropole Aix-Marseille-Provence"
        title="Cliquez pour agrandir la carte"
      />
    </a>
    <HomeLinesSection />
    <NuxtLink
      to="/carte-interactive"
      class="mt-12 flex items-center justify-center px-4 py-3 border border-cvv-blue-600 text-base font-medium rounded-md text-white bg-cvv-blue-600 sm:px-8 duration-100 hover:bg-white hover:text-cvv-blue-600"
    >
      Voir la carte complète
    </NuxtLink>
  </div>
</template>

<script setup>
const description = 'Découvrez le plan officiel du Plan Vélo Métropole Aix-Marseille-Provence.';
const COVER_IMAGE_URL = `${process.env.BASE_URL}/images/carte-piste-cyclable-plan-velo.jpg`;
useHead({
  title: 'Plan des lignes vélo sécurisées',
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

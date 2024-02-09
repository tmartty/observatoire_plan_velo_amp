<template>
  <div class="py-8 flex items-center">
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
        alt="plan officiel du plan vélo métropolitain"
        title="Cliquez pour agrandir la carte"
      />
    </a>
  </div>
</template>

<script setup>
const description = 'Découvrez le plan officiel du plan vélo métropolitain.';
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

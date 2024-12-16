const TITLE = 'Observatoire Plan Vélo Métropole Aix-Marseille-Provence';
const DESCRIPTION =
  "Une initiative du Collectif Vélos en Ville pour suivre le développement du plan vélo métropolitain : etat d'avancement, cartes interactives des itinéraires, détails, travaux.";
const BASE_URL = 'https://observatoire.velosenville.org/';
const COVER_IMAGE_URL = 'https://observatoire.velosenville.org/images/carte-piste-cyclable-plan-velo.jpg';

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: TITLE,
      meta: [
        { hid: 'description', name: 'description', content: DESCRIPTION },
        // facebook
        { property: 'og:site_name', content: TITLE },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: BASE_URL },
        { hid: 'og:title', property: 'og:title', content: TITLE },
        {
          hid: 'og:description',
          property: 'og:description',
          content: DESCRIPTION
        },
        { hid: 'og:image', property: 'og:image', content: COVER_IMAGE_URL },
        { property: 'og:image:width', content: '640' },
        { property: 'og:image:height', content: '476' },
        // twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:url', name: 'twitter:url', content: BASE_URL },
        { hid: 'twitter:title', name: 'twitter:title', content: TITLE },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: DESCRIPTION
        },
        { hid: 'twitter:image', name: 'twitter:image', content: COVER_IMAGE_URL }
      ]
    }
  },
  runtimeConfig: {
    public: {
      maptilerKey: process.env.MAPTILER_KEY
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', 'nuxt-icon', '@pinia/nuxt'],
  content: {
    markdown: {
      tags: { h1: 'h1', h5: 'h5', h6: 'h6' }
    }
  },
  tailwindcss: { viewer: false },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  build: {
    transpile: ['@headlessui/vue']
  }
});

<template>
  <footer class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
    <div class="max-w-7xl mx-auto py-12 px-0 overflow-hidden sm:px-6 lg:px-8 gap-8 flex flex-col">
      <hr />
      <nav class="flex flex-wrap justify-center sm:justify-end gap-4" aria-label="Footer">
        <div v-for="item in links" :key="item.name" class="">
          <NuxtLink :to="item.path" class="text-base text-gray-500 hover:text-gray-900">
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex justify-center space-x-6 md:order-2">
          <a
            v-for="item in socials"
            :key="item.name"
            :href="item.href"
            :title="item.name"
            target="_blank"
            class="text-gray-500 hover:text-gray-500"
          >
            <span class="sr-only">{{ item.name }}</span>
            <Icon :name="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div class="mt-8 md:mt-0 md:order-1 text-left flex gap-4">
          <img class="size-16" src="/logos/collectif_velos_en_ville.png" alt="logo collectif vélos en ville" />
          <div>
            <p class="text-base text-gray-500">Collectif Vélos en Ville</p>
            <p class="text-base text-gray-400">24 rue Moustier 13001 Marseille</p>
            <p class="text-base text-gray-400">09 54 58 88 77</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = [
  { name: 'Méthodologie', path: '/methodologie' },
  { name: 'Mentions légales', path: '/mentions-legales' }
  // { name: 'Historique', path: '/historique' }
];

const socials = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/velosenville',
    icon: 'mdi:twitter'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/VelosEnVille',
    icon: 'mdi:facebook'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/v%C3%A9los-en-ville',
    icon: 'mdi:linkedin'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/velosenville/',
    icon: 'mdi:instagram'
  },
  {
    name: 'Site web',
    href: 'https://www.velosenville.org/',
    icon: 'mdi:web'
  },
  {
    name: 'Email',
    href: 'mailto:collectif@velosenville.org',
    icon: 'mdi:email-outline'
  }
];
</script>

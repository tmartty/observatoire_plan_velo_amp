<template>
  <Popover class="relative z-50 bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center py-3 sm:py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start items-center lg:w-0 lg:flex-1">
          <NuxtLink to="/" class="flex space-x-2">
            <span class="sr-only">Collectif Vélos en Ville</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="/logos/collectif_velos_en_ville_complet.png"
              alt="picto collectif vélos en ville"
            />
          </NuxtLink>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <span class="sr-only">Ouvrir menu</span>
            <Icon name="mdi:menu" class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <NuxtLink
            v-for="navItem in navItems"
            :to="navItem.path"
            class="text-base hover:text-cvv-blue-600 font-medium"
            :class="[$route.path === navItem.path ? 'text-cvv-blue-600' : 'text-gray-500']"
            @click="close()"
          >
            {{ navItem.name }}
          </NuxtLink>
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton
              :class="[
                open ? 'text-gray-900' : 'text-gray-500',
                'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-cvv-blue-600    '
              ]"
            >
              <span>Lignes</span>
              <Icon
                name="mdi:chevron-down"
                :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                aria-hidden="true"
              />
            </PopoverButton>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                v-slot="{ close }"
                class="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2 sm:px-0"
              >
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div class="relative flex flex-col gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <NuxtLink
                      v-for="voie in voies"
                      :key="voie.line"
                      :to="getLignePath(voie.line)"
                      class="-m-2 flex items-start justify-start rounded-lg p-2 hover:bg-gray-50"
                      @click="close()"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="rounded-full flex items-center justify-center text-white font-bold px-2"
                          :style="`background-color: ${voie.color}`"
                        >
                          {{ voie.name }}
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </PopoverGroup>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        v-slot="{ close }"
        focus
        class="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
      >
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <NuxtLink to="/" @click="close()">
                <img
                  class="h-10 w-auto"
                  src="/logos/collectif_velos_en_ville.png"
                  alt="logo collectif vélos en ville"
                />
              </NuxtLink>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <span class="sr-only">Fermer menu</span>
                  <Icon name="mdi:close" class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <NuxtLink
                  v-for="navItem in navItems"
                  :key="navItem.name"
                  :to="navItem.path"
                  class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  @click="close()"
                >
                  <span class="ml-3 text-base font-medium text-gray-900">
                    {{ navItem.name }}
                  </span>
                </NuxtLink>
              </nav>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6 bg-gray-50">
            <div class="ml-3 text-base font-medium text-gray-900">Toutes les lignes</div>
            <div class="grid grid-cols-4 gap-y-4 gap-x-8">
              <NuxtLink
                v-for="voie in voies"
                :key="voie.line"
                :to="getLignePath(voie.line)"
                class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                @click="close()"
              >
                <div class="flex-shrink-0">
                  <div
                    class="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                    :style="`background-color: ${voie.color}`"
                  >
                    {{ voie.line }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';

const navItems = [
  { name: 'Carte interactive', path: '/carte-interactive' },
  { name: 'Évolution', path: '/evolution' },
  { name: 'Plan officiel', path: '/plan-officiel' }
];

const { data: voies } = await useAsyncData(() => {
  return queryContent('lignes').where({ _type: 'markdown' }).find();
});

function getLignePath(line) {
  return `/ligne-${line}`;
}
</script>

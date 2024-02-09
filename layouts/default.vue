<template>
  <div>
    <!-- <NewsBanner v-if="!isNewsBannerClosed" @close="closeNewsBanner" /> -->
    <AppHeader class="sticky top-0" />
    <div class="container mx-auto">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: true
});

// const isNewsBannerClosed = ref(true);

// onMounted(() => {
//   // if the banner was closed more than X days ago, show it again
//   const days = 7;
//   const newsBannerClosedAt = localStorage.getItem('newsBannerClosedAt');
//   if (newsBannerClosedAt) {
//     const newsBannerClosedAtDate = new Date(newsBannerClosedAt);
//     const now = new Date();
//     const diffInMilliseconds = now - newsBannerClosedAtDate;
//     const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
//     if (diffInHours > 24 * days) {
//       localStorage.removeItem('isNewsBannerClosed');
//       localStorage.removeItem('newsBannerClosedAt');
//     }
//   }
//   isNewsBannerClosed.value = localStorage.getItem('isNewsBannerClosed') === 'true';
// });

// function closeNewsBanner() {
//   isNewsBannerClosed.value = true;
//   localStorage.setItem('isNewsBannerClosed', 'true');
//   localStorage.setItem('newsBannerClosedAt', new Date().toISOString());
// }
</script>

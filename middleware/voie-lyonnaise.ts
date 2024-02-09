export default defineNuxtRouteMiddleware(to => {
  const ligneRegex = /ligne-(1[0-2]|[1-9])\b/;
  const isLigneValid = ligneRegex.test(to.fullPath);
  if (!isLigneValid) {
    return navigateTo('/404');
  }
});

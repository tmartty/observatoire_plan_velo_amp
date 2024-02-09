export default defineNuxtRouteMiddleware((to) => {
  // temporary redirect
  // before: /lignes/ligne-1
  // now: /ligne-1
  const oldPathRegex = /lignes\/ligne-(1[0-2]|[1-9])\b/
  const match = to.fullPath.match(oldPathRegex)
  if (match) {
    const ligneNumber = match[1]
    return navigateTo(`/ligne-${ligneNumber}`)
  }
})

<template>
  <div class="relative py-16 bg-white overflow-hidden">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
        <!-- prettier-ignore -->
        <svg class="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384" > <defs> <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" > <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" /> </pattern> </defs> <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" /> </svg>
        <!-- prettier-ignore -->
        <svg class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384" > <defs> <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" > <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" /> </pattern> </defs> <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" /> </svg>
        <!-- prettier-ignore -->
        <svg class="absolute bottom-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384" > <defs> <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" > <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" /> </pattern> </defs> <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" /> </svg>
      </div>
    </div>
    <div class="relative px-4 sm:px-6 lg:px-8">
      <div class="text-lg max-w-prose mx-auto">
        <h1>
          <span
            class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Matériel et méthodes
          </span>
        </h1>
      </div>
      <div class="mt-6 prose prose-lg text-gray-500 mx-auto">
        <p>
          Notre observatoire du plan vélo métropolitain est inspiré de l’observatoire du plan vélo de la ville de Paris
          et développé par l’<a href="https://parisenselle.fr/" target="_blank">association Paris en Selle.</a>
        </p>
        <p>
          Les tracés des différentes lignes du plan vélo métropolitain (Aix-Marseille Provence Métropole) proviennent de
          l’image figurant dans le dossier du plan vélo paru en juin 2019 :
          <a href="https://ampmetropole.fr/missions/mobilite/la-metropole-mobilite/services-levelo/" target="_blank"
            >https://ampmetropole.fr/missions/mobilite/la-metropole-mobilite/services-levelo/</a
          >
        </p>
        <p>
          Nous avons ensuite reporté ces tracés théoriques sur une carte numérique grâce au
          <a href="https://cocarto.com/" target="_blank">site web cocarto</a>. Cocarto est un logiciel / site web libre
          développé par les <a href="https://www.codeursenliberté.fr/" target="_blank">codeurs en liberté</a>. Notre
          association tient à les remercier pour ce travail et nos échanges.
        </p>
        <div class="flex flex-row justify-start items-start gap-8 w-full">
          <img
            src="/images/carte-piste-cyclable-plan-velo.jpg"
            class="object-cover w-full h-full"
            alt="carte officiel du Plan Vélo Métropole Aix-Marseille-Provence"
            title="carte officiel du Plan Vélo Métropole Aix-Marseille-Provence"
          />
          <img
            src="/images/cocarto-carte-velo-originale.png"
            class="object-cover w-full h-full"
            alt="carte cocarto crée par le Collectif Vélos en Ville"
            title="carte cocarto crée par le Collectif Vélos en Ville"
          />
        </div>
        <p>
          À partir de ces tracés, nous avons ainsi pu déterminer les linéaires d’aménagement à réaliser pour chacune des
          lignes et pour chacune d’elles les portions à réaliser durant les deux phases du plan, 2019 – 2024 et 2024 –
          2023. Ces linéaires théoriques représentent au total 120 km sur notre carte soit sensiblement le même chiffre
          de 125km si on additionne les chiffres indiqués dans le visuel de la métropole ci-dessus.
        </p>
        <p>
          Des relevés de terrain ont ensuite permis, de tracer et d’évaluer sur cette même carte la part des
          aménagements effectivement réalisés en date du mois de septembre 2023. Nous avons ainsi accès au linéaire
          d’aménagement effectivement réalisé à cette date.
        </p>
        <p>
          L’état des connaissances de l’association et des observations avec des outils de visualisations des rues ont
          permis de déterminer et donc de quantifier les aménagements de voirie qui avait été réalisés avant le
          lancement du plan vélo.
        </p>
        <p>
          L’avenue du Prado au statut très particulier (puisque des arrêtés de circulation pour pistes cyclables
          existent, mais que la signalisation est inexistante) n’a pas été pris en compte dans les calculs. Par
          ailleurs, alors qu’elle a été réalisée pendant les mois qui ont précédé le plan vélo métropolitain, la piste
          cyclable de la Corniche Kennedy a elle été comptabilisée comme un aménagement réalisé durant la première phase
          (2019-2024) de ce plan.
        </p>
        <p>
          Les chiffres qui sont présentés reflètent la part de réalisation actuelle soit en fonction du total des
          infrastructures à réaliser (théorique) durant les deux phases (2019 et 2030) soit en fonction du total
          (théorique) des infrastructures à réaliser durant la première phase (2019-2024).
        </p>
        <p>
          Le site internet
          <a href="www.observatoire.velosenville.org" target="_blank">www.observatoire.velosenville.org</a> qui permet
          la visualisation des cartes et des données est issu du code source du
          <a href="https://cyclopolis.fr/" target="_blank">site internet Cyclopolis</a> codé par
          <a href="https://x.com/benoit_dmgdt" target="_blank">Benoit Demaegdt</a> et utilisé par l’<a
            href="https://lavilleavelo.org/"
            target="_blank"
            >association La Ville à Vélo</a
          >
          à Lyon. L’association tient à les remercier pour la mise à disposition du code et nos échanges.
        </p>
        <p>Les données sont exportées de cocarto vers cyclopolis via un fichier geojson.</p>
        <h2>Réutilisation du contenu du site</h2>
        <p>
          Toute réutilisation brute des cartographies interactives du site, des chiffres du tableau de bord et des
          détails écrits des tronçons de chaque ligne doivent faire systématiquement mention du nom de la plateforme «
          Observatoire Plan Vélo » (avec lien vers
          <a href="https://observatoire.velosenville.org/" rel="noopener noreferrer" target="_blank"></a
          ><a href="https://observatoire.velosenville.org/" rel="nofollow">www.observatoire.velosenville.org</a>) et du
          nom de l’association contributrice « Collectif Vélos en Ville » (avec lien vers
          <a href="https://www.velosenville.org/" rel="noopener noreferrer" target="_blank"></a
          ><a href="https://www.velosenville.org/" rel="nofollow">www.velosenville.org</a>).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentionsLegales'
};
</script>

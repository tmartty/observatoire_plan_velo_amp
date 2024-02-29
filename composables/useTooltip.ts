const { getDistance } = useStats();

type Status = 'done' | 'wip' | 'planned' | 'postponed' | 'variante';

type Feature = {
  type: string;
  properties: {
    id?: string;
    ligne: number;
    nom: string;
    phase: string;
    statut: Status;
    date_realisation: string;
    typologie: string;
    typologie_interne: string;
    commentaire: string;
    calculated_length: number;
    reseau: string;
  };
  geometry: {
    type: string;
    coordinates: number[][];
  };
};

type ParkingProperties = {
  id: number;
  type: string;
  capacity: number;
};

// type PerspectiveProperties = {
//   line: number;
//   imgUrl: string;
// };

// function getStatusText(status: Status, doneAt?: string): string {
//   const statusText = {
//     done: () => `Terminé (${getDoneAtText(doneAt!)})`,
//     wip: () => 'En travaux',
//     planned: () => 'Prévu',
//     postponed: () => 'Reporté après 2026',
//     variante: () => 'Variante',
//     'variante-postponed': () => 'Variante reportée après 2026',
//     unknown: () => 'Tracé à définir'
//   };
//   return statusText[status]();
// }

function getDoneAtText(doneAt: string): string {
  const [day, month, year] = doneAt.split('/');
  const isBeforeMandat =
    new Date(Number(year), Number(month) - 1, Number(day)).getTime() < new Date(2021, 0, 1).getTime();
  if (isBeforeMandat) {
    return 'avant 2021';
  }
  return `le ${doneAt}`;
}

export const useTooltip = () => {
  const { getLineColor } = useColors();

  function getTooltipSectionInfo(feature: Feature) {
    console.log(
      Object.entries(feature.properties)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    );

    const color = getLineColor(feature.properties.ligne);
    return `
      <div class="not-prose text-black w-56">
        <div class="h-10 flex items-center" style="background-color: ${color}">
          <div class="p-2">
            <a class='text-white font-bold text-lg hover:underline' href='/ligne-${feature.properties.ligne}'>
              Ligne ${feature.properties.ligne}
            </a>
          </div>
        </div>
        <div class='p-2 flex flex-col gap-2'>
          <div class='text-xl leading-tight'>${feature.properties.nom}</div>
          <div class='text-md leading-tight'>
            <span class='text-xs leading-tight font-bold'>${feature.properties.typologie ? feature.properties.typologie + ' ' : ''}</span>
            <span>${feature.properties.statut}</span>
            <span class='italic'>${feature.properties.calculated_length ? ` (${Math.round(feature.properties.calculated_length)}m)` : ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  function getTooltipParking(data: ParkingProperties) {
    console.log(
      Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    );

    return `
      <div class="not-prose text-black">
        <div class="h-10 flex items-center" style="background-color: #429ada;">
          <div class="p-2 text-white font-bold text-lg text-center">
            ${data.type || 'type inconnu'}
          </div>
        </div>
        <div class='p-2 flex flex-col gap-2'>
           ${data.capacity ? `capacité pour ${data.capacity} vélos` : 'capacité inconnue'}
        </div>
      </div>
    `;
  }

  // function getTooltipPerspective(properties: PerspectiveProperties) {
  //   const color = getLineColor(properties.ligne);
  //   return `
  //     <div class="h-10 flex items-center not-prose text-black" style="background-color: ${color}">
  //       <div class="p-2">
  //         <a class='text-white font-bold text-lg hover:underline' href='/ligne-${properties.ligne}'>
  //           Ligne ${properties.ligne}
  //         </a>
  //       </div>
  //     </div>
  //     <img src="${properties.imgUrl}" class='my-0'>
  //   `;
  // }

  return { getTooltipSectionInfo, getTooltipParking };
};

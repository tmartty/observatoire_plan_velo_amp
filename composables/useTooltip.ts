import { Feature } from 'geojson'; // Adjust the import based on your actual setup

const { getDistance } = useStats();

type Status = 'done' | 'wip' | 'planned' | 'postponed' | 'variante';

type Feature = {
  type: string;
  properties: {
    id?: string;
    ligne: number;
    anchor: string;
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

    // TODO: fix detail link generation using
    // https://github.com/benoitdemaegdt/voieslyonnaises/pull/286/files#diff-20f28d37e1534304803b4c3f435ffcf3fb02fa97b039ac63a83c8d4a90751c72
    // TODO: adjust frontend for detail link

    return `
      <div class="not-prose text-black w-56">
        <div class="h-10 flex items-center" style="background-color: ${color}">
          <div class="p-2 flex flex-row justify-between items-center w-full">
            <a class='text-white font-bold text-lg hover:underline' href='/ligne-${feature.properties.ligne}'>
              Ligne ${feature.properties.ligne}
            </a>
          </div>
        </div>
        <div class='p-2 flex flex-col gap-2'>
          <div class='text-xl leading-tight'>
            ${feature.properties.nom}
          </div>
          <div class='text-md leading-tight'>
            <span class='text-xs leading-tight font-bold'>${feature.properties.typologie ? feature.properties.typologie + ' ' : ''}</span>
            <span>${feature.properties.statut}</span>
            <span class='italic'>${feature.properties.calculated_length ? ` (${Math.round(feature.properties.calculated_length)}m)` : ''}</span>
          </div>
          </div>
          </div>
          `;
    // TODO: re-enable link for detail on each section
    // <a class='italic inline-flex text-right hover:underline items-center gap-2 justify-end' href='${getSectionDetailsUrl(feature.properties)}'>
    //   voir le detail <svg class='size-5' data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    // </a>
  }

  function getTooltipParking(data: ParkingProperties) {
    console.log(
      Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    );
  }

  function getSectionDetailsUrl(properties: Feature['properties']) {
    // create hash using properties nom, replacing spaces with dashes and removing any special characters
    const hash = properties.anchor
      ? properties.anchor
      : properties.nom
        ? properties.nom
            .replace(/ /g, '-')
            // remove dots
            .replace(/\./g, '')
            .normalize('NFD')
            .toLowerCase()
        : '';
    if (hash) {
      return `/ligne-${properties.ligne}#${hash}`;
    } else {
      return null;
    }
  }

  return {
    getTooltipSectionInfo,
    getTooltipParking
  };
};

const { getDistance } = useStats();

type Status = 'done' | 'wip' | 'planned' | 'postponed' | 'variante';

type Feature = {
  type: string;
  properties: {
    id?: string;
    line: number;
    name: string;
    status: Status;
    doneAt?: string;
  };
  geometry: {
    type: string;
    coordinates: number[][];
  };
};

type PerspectiveProperties = {
  line: number;
  imgUrl: string;
};

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

  function getTooltipHtml(feature: Feature) {
    const color = getLineColor(feature.properties.line);
    return `
      <div class="not-prose text-black">
        <div class="h-10 flex items-center" style="background-color: ${color}">
          <div class="p-2">
            <a class='text-white font-bold text-lg hover:underline' href='/ligne-${feature.properties.line}'>
              Ligne ${feature.properties.line}
            </a>
          </div>
        </div>
        <div class='p-2 flex flex-col gap-2'>
          <div class='text-xl leading-tight'>${feature.properties.name}</div>
          <div class='text-md leading-tight'>
            <span class='text-xs leading-tight font-bold'>${feature.properties.Typologie ? feature.properties.Typologie + ' ' : ''}</span>
            <span>${feature.properties.status}</span>
            <span class='italic'>${feature.properties.calculated_length ? ` (${Math.round(feature.properties.calculated_length)}m)` : ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  function getTooltipPerspective(properties: PerspectiveProperties) {
    const color = getLineColor(properties.line);
    return `
      <div class="h-10 flex items-center not-prose text-black" style="background-color: ${color}">
        <div class="p-2">
          <a class='text-white font-bold text-lg hover:underline' href='/ligne-${properties.line}'>
            Voie Lyonnaise ${properties.line}
          </a>
        </div>
      </div>
      <img src="${properties.imgUrl}" class='my-0'>
    `;
  }

  return { getTooltipHtml, getTooltipPerspective };
};

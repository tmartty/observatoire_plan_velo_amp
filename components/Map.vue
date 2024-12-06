<template>
  <div class="relative">
    <LegendModal ref="legendModalComponent" />
    <div id="map" class="relative rounded-lg h-full w-full" />
    <a
      v-if="options.logo"
      class="my-0 absolute bottom-0 right-0 z-10 p-2 md:p-4 size-16 md:size-24"
      href="https://velosenville.org"
      target="_blank"
    >
      <img class="m-0" src="/logos/collectif_velos_en_ville.png" alt="logo Collectif Vélos en Ville" />
    </a>
  </div>
</template>

<script setup>
// import { useMapStore } from '@/stores/map';
import { Map, NavigationControl, AttributionControl, GeolocateControl, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import style from '@/assets/map-styles.json';
import AllBikeInfrastructureControl from '@/maplibre/AllBikeInfrastructureControl';
import BikeParkingControl from '@/maplibre/BikeParkingControl';
import LegendControl from '@/maplibre/LegendControl';
import FullscreenControl from '@/maplibre/FullscreenControl';
import ShrinkControl from '@/maplibre/ShrinkControl';

// const config = useRuntimeConfig();
// const maptilerKey = config.public.maptilerKey;

const props = defineProps({
  features: { type: Array, required: true },
  options: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

const defaultOptions = {
  logo: true,
  legend: true,
  bikeParking: true,
  allBikeInfrastructureBaseLayer: true,
  geolocation: false,
  fullscreen: false,
  onFullscreenControlClick: () => {},
  shrink: false,
  onShrinkControlClick: () => {}
};

const options = { ...defaultOptions, ...props.options };

const legendModalComponent = ref(null);

const {
  plotBikeParking,
  plotBaseBikeInfrastructure,
  plotUnderlinedSections,
  plotPlannedSections,
  plotDoneSections,
  plotWipSections,
  // plotVarianteSections,
  // plotVariantePostponedSections,
  // plotUnknownSections,
  // plotPostponedSections,
  // plotPerspective,
  fitBounds
} = useMap();

const { getTooltipSectionInfo, getTooltipParking } = useTooltip();

function plotFeatures({ map, features }) {
  // plotBaseBikeInfrastructure({ map });
  plotUnderlinedSections({ map, features });
  plotPlannedSections({ map, features });
  plotDoneSections({ map, features });
  plotWipSections({ map, features });
  // plotVarianteSections({ map, features });
  // plotVariantePostponedSections({ map, features });
  // plotUnknownSections({ map, features });
  // plotPostponedSections({ map, features });
  // plotPerspective({ map, features });
}

onMounted(() => {
  const map = new Map({
    container: 'map',
    style,
    // style: `https://api.maptiler.com/maps/dataviz/style.json?key=${maptilerKey}`,
    center: [5.3737, 43.2979],
    zoom: 12,
    attributionControl: false
  });

  // useMapStore().setMap(map);

  // add Marseille city limits layer from URL
  // map.on('load', () => {
  //   map.addSource('marseille-city-limits', {
  //     type: 'geojson',
  //     data: '/data/arrondissements_marseille.geojson'
  //   });
  //   map.addLayer({
  //     id: 'marseille-city-limits-fill',
  //     source: 'marseille-city-limits',
  //     type: 'fill',
  //     paint: {
  //       'fill-color': '#000',
  //       'fill-opacity': 0.05
  //     }
  //   });
  // });

  map.addControl(new NavigationControl({ showCompass: false }), 'top-left');
  map.addControl(new AttributionControl({ compact: false }), 'bottom-left');
  if (options.fullscreen) {
    const fullscreenControl = new FullscreenControl({
      onClick: () => options.onFullscreenControlClick()
    });
    map.addControl(fullscreenControl, 'top-right');
  }
  if (options.geolocation) {
    map.addControl(
      new GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      }),
      'top-right'
    );
  }
  if (options.shrink) {
    const shrinkControl = new ShrinkControl({
      onClick: () => options.onShrinkControlClick()
    });
    map.addControl(shrinkControl, 'top-right');
  }
  if (options.legend) {
    const legendControl = new LegendControl({
      onClick: () => legendModalComponent.value.openModal()
    });
    map.addControl(legendControl, 'top-right');
  }
  // OSM bike infastucture
  if (options.allBikeInfrastructureBaseLayer) {
    const allBikeInfrastructureControl = new AllBikeInfrastructureControl({
      // if it doesn't exist, create the base layer that shows all bike infrastructure based on OSM
      // otherwise, toggle it's visibility
      onClick: async () => {
        if (map.getLayer('base-infrastructure')) {
          const visibility = map.getLayoutProperty('base-infrastructure', 'visibility');
          map.setLayoutProperty(
            'base-infrastructure',
            'visibility',
            visibility === 'visible' || !visibility ? 'none' : 'visible'
          );
        } else {
          // create an overlay on the map while the data is loading
          map.addLayer({
            id: 'loading-overlay',
            type: 'background',
            paint: {
              'background-color': 'rgba(0, 0, 0, 0.25)'
            }
          });

          await plotBaseBikeInfrastructure({ map });

          // remove the loading spinner and overlay
          map.removeLayer('loading-overlay');
        }
      }
    });
    map.addControl(allBikeInfrastructureControl, 'top-right');
  }
  // OSM bike parking spots
  if (options.bikeParking) {
    const bikeParkingControl = new BikeParkingControl({
      // if it doesn't exist, create the base layer based on OSM
      // otherwise, toggle it's visibility
      onClick: async () => {
        if (map.getLayer('bike-parking')) {
          const visibility = map.getLayoutProperty('bike-parking', 'visibility');
          map.setLayoutProperty(
            'bike-parking',
            'visibility',
            visibility === 'visible' || !visibility ? 'none' : 'visible'
          );
        } else {
          // create an overlay on the map while the data is loading
          map.addLayer({
            id: 'loading-overlay',
            type: 'background',
            paint: {
              'background-color': 'rgba(0, 0, 0, 0.25)'
            }
          });

          await plotBikeParking({ map });

          // remove the loading spinner and overlay
          map.removeLayer('loading-overlay');
        }
      }
    });
    map.addControl(bikeParkingControl, 'top-right');
  }

  map.on('load', () => {
    plotFeatures({ map, features: props.features });
    fitBounds({ map, features: props.features });
  });
  // make sure the "place-other" layer remains on top for better visibility
  map.on('dataloading', () => {
    if (map.getLayer('place-other')) map.moveLayer('place-other', null);
  });

  watch(
    () => props.features,
    newFeatures => {
      plotFeatures({ map, features: newFeatures });
    }
  );

  // must do this to avoid multiple popups
  map.on('click', e => {
    // console.log('e.lngLat >>', e.lngLat)
    const features = map
      .queryRenderedFeatures(e.point)
      .filter(({ layer }) => !['maptiler_planet', 'openmaptiles'].includes(layer.source));

    if (features.length === 0) {
      return;
    }

    const isParking = features.some(({ layer }) => layer.id === 'bike-parking');

    if (isParking) {
      const feature = features.find(({ layer }) => layer.id === 'bike-parking');
      new Popup({ closeButton: false, closeOnClick: true })
        .setLngLat(e.lngLat)
        .setHTML(getTooltipParking(feature.properties))
        .addTo(map);
    } else {
      const { ligne, id } = features[0].properties;
      const feature = props.features.find(
        feature => feature.properties.ligne === ligne && feature.properties.id === id
      );
      new Popup({ closeButton: false, closeOnClick: true })
        .setLngLat(e.lngLat)
        .setHTML(getTooltipSectionInfo(feature))
        .addTo(map);
    }
  });
});
</script>

<style>
.maplibregl-popup-content {
  @apply p-0 rounded-lg overflow-hidden max-w-full;
}

.maplibregl-info {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url('~/maplibre/info.svg');
  background-size: 85%;
}

.maplibregl-parking {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url("data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath fill-rule='nonzero' d='M6 3h7a6 6 0 1 1 0 12h-3v6H6V3zm4 4v4h3a2 2 0 1 0 0-4h-3z'/%3E%3C/g%3E%3C/svg%3E");
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='-1.4 -1.4 16.80 16.80' id='svg2' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3Crect x='-1.4' y='-1.4' width='16.80' height='16.80' rx='0' fill='%23fff' strokewidth='0'%3E%3C/rect%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cmetadata id='metadata8'%3E%3Crdf:rdf%3E%3Ccc:work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage'%3E%3C/dc:type%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:work%3E%3C/rdf:rdf%3E%3C/metadata%3E%3Cdefs id='defs6'%3E%3C/defs%3E%3Crect width='14' height='14' x='0' y='0' id='canvas' style='fill:none;stroke:none;visibility:hidden'%3E%3C/rect%3E%3Cpath d='m 0,0 0,10 2.000077,0 0,-3.5 2.500097,0 c 1.976154,3e-7 3.500135,-1 3.500135,-3.25 C 8.000309,1 6.4871,2e-7 4.968942,0 z m 2.000077,2 2.500097,0 c 0.963608,0 1.500058,0.5254308 1.500058,1.25 0,0.7245692 -0.631804,1.25 -1.500058,1.25 l -2.500097,0 z M 9,7 9,7.5938559 9.500367,8 l 0,0.75 -3.000116,0 0,-0.25 0.50002,0 c 0.479412,0 0.455442,-0.5 0,-0.5 L 5.500213,8 c -0.50002,0 -0.50002,0.452061 0,0.5 l 0.500019,0 0,0.25 -0.562522,1.28125 C 5.296384,10.001436 5.147956,10 5.000193,10 c -1.02182,0 -2.000077,0.793929 -2.000077,2 0,1.206071 0.978257,2 2.000077,2 1.02182,0 1.937575,-0.856429 1.937575,-2.0625 0,-0.150759 -0.0039,-0.302075 -0.03125,-0.4375 l 0.843783,0 1.821945,-2 0.365639,0.78125 C 9.383285,10.615837 9.000348,11.229684 9.000348,12 c 0,1.206071 0.978257,2 2.000077,2 C 12.022246,14 12.938,13.143571 12.938,11.9375 12.938,10.731429 12.022246,10 11.000425,10 c -0.15008,0 -0.292278,0.02946 -0.437517,0.0625 L 10.000386,8.75 10,7.8 z m -2.593502,2.5 2.193834,0 -1.193796,1.25 -0.843782,0 C 6.422636,10.56342 6.258266,10.401358 6.062734,10.28125 z M 5.000193,11 c 0.635098,0 1.000039,0.549217 1.000039,1 0,0.450783 -0.364941,1 -1.000039,1 -0.635098,0 -1.000038,-0.549217 -1.000038,-1 0,-0.450783 0.36494,-1 1.000038,-1 z m 6.000232,0 c 0.635099,0 1.000039,0.549217 1.000039,1 0,0.450783 -0.36494,1 -1.000039,1 -0.635098,0 -1.000039,-0.549217 -1.000039,-1 0,-0.450783 0.364941,-1 1.000039,-1 z' id='parking-bicycle' style='fill:%23000000;fill-rule:evenodd'%3E%3C/path%3E%3C/g%3E%3C/svg%3E"); */
}

.maplibregl-bike {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url('data:image/svg+xml,<%3Fxml version="1.0" encoding="iso-8859-1"%3F><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg fill="%23000000" height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300.25 300.25" xml:space="preserve"><path d="M238.703,127.946c-5.119,0-10.089,0.487-14.847,1.67l-18.955-50.955h6.176c9.72,0,18.913-3.577,25.887-10.345l6.541-6.273c2.973-2.885,3.043-7.595,0.158-10.568s-7.633-3.024-10.605-0.139l-6.541,6.206c-4.159,4.037-9.643,6.118-15.439,6.118h-16.979c-2.458,0-4.76,1.356-6.161,3.375c-1.401,2.02-1.725,4.673-0.865,6.975l7.214,19.372c-0.046-0.001-0.093,0.141-0.139,0.141c-0.016,0-0.032,0.137-0.049,0.137H98.126L85.165,71.823l14.078-4.895c3.467-1.191,5.564-4.55,4.961-8.166c-0.604-3.615-3.731-6.101-7.397-6.101H55.597c-5.775,0-10.475,4.506-10.475,10.281c0,8.941,7.266,16.12,16.196,16.12c1.79,0,3.565-0.347,5.277-0.934l4.103-1.433l13.146,21.996l-10.097,30.285c-3.312-0.669-6.714-1.09-10.193-1.201c-17.589-0.563-34.055,6.138-46.219,18.697c-11.694,12.074-17.84,27.992-17.303,44.822c1.032,32.337,27.172,58.476,59.509,59.508c0.673,0.021,1.34,0.032,2.008,0.032c16.811,0,32.513-6.716,44.212-18.794c9.464-9.773,15.291-22.38,16.885-35.38h12.051c2.598,2,5.961,3.634,9.639,3.634c8.196,0,14.864-6.636,14.864-14.833c0-2.661-0.712-5.139-1.942-7.303l42.042-71.305l10.553,28.289c-19.435,10.359-32.698,30.831-32.698,54.348c0,33.938,27.61,61.549,61.548,61.549s61.547-27.61,61.547-61.547S272.641,127.946,238.703,127.946z M180.979,108.661l-36.606,62.091c-0.013,0-0.025-0.062-0.037-0.062c-0.043,0-0.084,0.096-0.127,0.097l-37.131-62.125H180.979z M93.992,115.669l37.378,62.514c-0.618,1.101-1.089,2.478-1.412,3.478h-7.326c-2.591-21-16.064-39.121-34.658-48.001L93.992,115.669z M74.447,181.661c-0.503-1-1.081-1.526-1.728-2.233l8.865-26.626c10.72,5.925,18.562,16.859,20.834,28.859H74.447z M91.395,218.126c-8.215,8.481-19.311,13.04-31.215,12.655c-21.822-0.696-39.461-18.319-40.157-40.141c-0.363-11.369,3.784-22.112,11.679-30.262c7.898-8.154,18.497-12.642,29.845-12.642c0.455,0,0.91,0.01,1.369,0.024c1.502,0.048,2.981,0.185,4.439,0.389l-8.966,26.9c-6.569,1.537-11.481,7.43-11.481,14.461c0,8.196,6.668,14.801,14.863,14.801c5.552,0,10.395-2.65,12.947-7.65h27.699C100.966,204.661,97.197,212.135,91.395,218.126z M238.703,231.042c-22.909,0-41.548-18.639-41.548-41.548c0-14.932,7.921-28.044,19.779-35.369l14.098,37.785c1.125,3.017,3.986,4.88,7.027,4.88c0.871,0,1.757-0.152,2.621-0.476c3.881-1.447,5.853-5.768,4.404-9.648l-14.169-37.977c2.524-0.481,5.125-0.743,7.788-0.743c22.909,0,41.547,18.639,41.547,41.548S261.613,231.042,238.703,231.042z"/></svg>');
}

.maplibregl-fullscreen {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='29' fill='%23333'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E");
}

.maplibregl-shrink {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='29'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E");
}

.maplibregl-popup-anchor-top .maplibregl-popup-tip,
.maplibregl-popup-anchor-top-left .maplibregl-popup-tip,
.maplibregl-popup-anchor-top-right .maplibregl-popup-tip {
  border-bottom-color: transparent;
}
.maplibregl-popup-anchor-bottom .maplibregl-popup-tip,
.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip,
.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip {
  border-top-color: transparent;
}
.maplibregl-popup-anchor-left .maplibregl-popup-tip {
  border-right-color: transparent;
}
.maplibregl-popup-anchor-right .maplibregl-popup-tip {
  border-left-color: transparent;
}
</style>

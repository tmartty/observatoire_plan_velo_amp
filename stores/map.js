import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
    state: () => ({
        map: null,
    }),
    getters: {
        getMap() {
            return this.map
        },
    },
    actions: {
        setMap(map) {
            this.map = map
        },
    },
});

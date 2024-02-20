import fetch from 'node-fetch'
import fs from 'fs'

export default async function updateAllBikeLanesGeojsonData(req) {
    if (
        process.env.NODE_ENV !== 'development'
        && req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return "Unauthorized"
    }

    // do an API call to update all bike lanes geojson data
    const apiUrl = "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3Barea%5B%22name%22%3D%22Marseille%22%5D%2D%3E%2EsearchArea%3B%28way%5B%22highway%22%7E%22cycleway%7Ccycleway%5Flane%7Ccycleway%5Ftrack%22%5D%28area%2EsearchArea%29%3Bway%5B%22bicycle%22%7E%22designated%22%5D%28area%2EsearchArea%29%3Bway%5B%22cycleway%3Aleft%22%3D%22track%22%5D%28area%2EsearchArea%29%3Bway%5B%22cycleway%3Aright%22%3D%22track%22%5D%28area%2EsearchArea%29%3Bway%5B%22cycleway%3Aleft%22%3D%22lane%22%5D%28area%2EsearchArea%29%3Bway%5B%22cycleway%3Aright%22%3D%22lane%22%5D%28area%2EsearchArea%29%3B%29%3Bout%20ids%20geom%3B%3E%3Bout%20skel%20qt%3B%0A"

    // fetch data
    const response = await fetch(apiUrl)
    const data = await response.json()

    // convert data to geojson
    const geojson = {
        type: "FeatureCollection",
        features: data.elements.map((element) => {
            if (!element.geometry) return []
            const feature = {
                type: "Feature",
                properties: {
                    id: element.id,
                    tags: element.tags,
                },
                geometry: {
                    type: "LineString",
                    coordinates: element.geometry.map((geometry) => {
                        return [geometry.lon, geometry.lat]
                    })
                },
            }
            return feature
        }),
    }

    // remove empty entries
    geojson.features = geojson.features.filter((feature) => feature.type)

    // save geojson to marseille_all_bike_lanes.geojson
    const filePath = "./public/data/marseille_all_bike_lanes.geojson"
    fs.writeFileSync(filePath, JSON.stringify(geojson))

    // return response
    return {
        status: "success",
        message: "Bike lanes geojson data updated successfully",
    }
}
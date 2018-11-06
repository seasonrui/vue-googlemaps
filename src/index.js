import 'regenerator-runtime/runtime'
import loader from './lib-loader'
import { optionMergeStrategies } from './options'
import { initErrorHandling } from './utils/error'

import Circle from './components/Circle'
import Geocoder from './components/Geocoder'
import Map from './components/Map.vue'
import Marker from './components/Marker'
import NearbyPlaces from './components/NearbyPlaces'
import PlaceDetails from './components/PlaceDetails'
import UserPosition from './components/UserPosition'
import Drawing from './components/Drawing'
import HeatMap from './components/HeatMap'
import Infowindow from './components/Infowindow.vue'
import SearchBox from './components/SearchBox.vue'

import MapElement from './mixins/MapElement'

export {
	Circle,
	Geocoder,
	Map,
	Marker,
	NearbyPlaces,
	PlaceDetails,
	UserPosition,
	MapElement,
	Drawing,
	HeatMap,
	Infowindow,
	SearchBox,

}

function registerComponents (Vue, prefix) {
	Vue.component(`${prefix}circle`, Circle)
	Vue.component(`${prefix}geocoder`, Geocoder)
	Vue.component(`${prefix}map`, Map)
	Vue.component(`${prefix}marker`, Marker)
	Vue.component(`${prefix}nearby-places`, NearbyPlaces)
	Vue.component(`${prefix}place-details`, PlaceDetails)
	Vue.component(`${prefix}user-position`, UserPosition)
	Vue.component(`${prefix}drawing`, Drawing)
	Vue.component(`${prefix}heatmap`, HeatMap)
	Vue.component(`${prefix}infowindow`, Infowindow)
	Vue.component(`${prefix}search-box`, SearchBox)
}

const plugin = {
	// eslint-disable-next-line no-undef
	version: VERSION,
	install (Vue, options) {
		const finalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'googlemaps-',
		}, options)

		optionMergeStrategies(Vue)
		initErrorHandling(Vue)

		if (finalOptions.installComponents) {
			registerComponents(Vue, finalOptions.componentsPrefix)
		}

		if (finalOptions.load) {
			loader.load(finalOptions.load)
		}
	},
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

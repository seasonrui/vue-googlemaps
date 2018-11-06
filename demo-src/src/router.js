import VueRouter from 'vue-router'
import store from './store'

import SimpleMap from './components/SimpleMap.vue'
import NearbyPlaces from './components/NearbyPlaces.vue'
import LocationGeocoder from './components/LocationGeocoder.vue'
import PlaceDetails from './components/PlaceDetails.vue'
import Drawing from './components/Drawing.vue'
import HeatMap from './components/HeatMap.vue'
import SearchBox from './components/SearchBox.vue'

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', name: 'simple', component: SimpleMap },
		{ path: '/nearby', name: 'nearby', component: NearbyPlaces },
		{ path: '/geocoder', name: 'geocoder', component: LocationGeocoder },
		{ path: '/place-details', name: 'place-details', component: PlaceDetails },
		{ path: '/drawing', name: 'drawing', component: Drawing },
		{ path: '/heatmap', name: 'heatmap', component: HeatMap },
		{ path: '/search-box', name: 'search-box', component: SearchBox },
	],
})

router.afterEach(() => {
	store.dispatch('layout/setSideNavOpen', false)
})

export default router

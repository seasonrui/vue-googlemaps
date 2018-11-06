import MapElement from '../mixins/MapElement'

const boundProps = []

const redirectedEvents = []

export default {
	mixins: [
		MapElement,
	],

	props: {
		data: {
			type: Array,
		},
		radius: {
			type: Number,
			default: null,
		},
		gradient: {
			type: Array,
			default: null,
		},
		opacity: {
			type: Number,
			default: null,
		},
		maxIntensity: {
			type: Number,
			default: null,
		},
		dissipating: {
			type: Boolean,
			default: null,
		},
	},
	render (h) {
		return ''
	},
	googleMapsReady () {
		let data = this.data.map(item => {
			return {location: new window.google.maps.LatLng(item.lat, item.lng), weight: (item.weight || 0)}
		})
		const options = Object.assign({}, this.$props, {data: data})
		options.map = this.$_map

		this.$_heatmap = new window.google.maps.visualization.HeatmapLayer(options)

		this.bindProps(this.$_heatmap, boundProps)
		this.redirectEvents(this.$_heatmap, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$_heatmap) {
			this.$_heatmap.setMap(null)
		}
	},
}

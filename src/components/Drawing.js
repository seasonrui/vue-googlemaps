import MapElement from '../mixins/MapElement'

const boundProps = [
	'draggable',
	'editable',
]

const redirectedEvents = [
	'circlecomplete',
	'overlaycomplete',
	'rectanglecomplete',
]

export default {
	name: 'GoogleMapsDrawing',

	mixins: [
		MapElement,
	],

	props: {
		rectangleOptions: {
			type: Object,
		},
		circleOptions: {
			type: Object,
		},
		polygonOptions: {
			type: Object,
		},
		polylineOptions: {
			type: Object,
		},
		markerOptions: {
			type: Object,
		},
		drawingControl: {
			type: Boolean,
		},
		drawingMode: {
			type: String,
		},
		drawingControlOptions: {
			type: Object,
		},
	},
	render (h) {
		return ''
	},
	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		this.$_drawing = new window.google.maps.drawing.DrawingManager(options)

		this.bindProps(this.$_drawing, boundProps)
		this.redirectEvents(this.$_drawing, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$_drawing) {
			this.$_drawing.setMap(null)
		}
	},
}

<template>
	<div ref="infowindow">
		<slot>
		</slot>
	</div>
</template>
<script>
	import MapElement from '../mixins/MapElement'

	const boundProps = []

	const redirectedEvents = [
		'domready',
		'closeclick',
	]

	export default {
		mixins: [
			MapElement,
		],

		props: {
			options: {
				type: Object,
				twoWay: false,
				default () {
					return {}
				},
			},
			content: {
				default: null,
			},
			opened: {
				type: Boolean,
				default: false,
				twoWay: true,
			},
			position: {
				type: Object,
			},
			zIndex: {
				type: Number,
			},
		},
		watch: {
			opened () {
				this.openInfoWindow()
			},
		},
		googleMapsReady () {
			const options = Object.assign({}, this.$props)
			options.map = this.$_map

			this.$_infowindow = new window.google.maps.InfoWindow(options)

			this.listen(this.$_infowindow, 'closeclick', () => {
				this.$emit('update:opened', false)
			})
			this.bindProps(this.$_infowindow, boundProps)
			this.redirectEvents(this.$_infowindow, redirectedEvents)
	},
		methods: {
			openInfoWindow () {
				if (this.opened) {
					this.$_parentMarker = this.$parent.$_marker
					if (this.$_parentMarker) {
						this.$_infowindow.setContent(this.$refs.infowindow)
						this.$_infowindow.open(this.$_map, this.$_parentMarker)
					} else {
						this.$_infowindow.open(this.$_map)
					}
				} else {
					this.$_infowindow.close()
				}
			},
		},
		beforeDestroy () {
			if (this.$_infowindow) {
				this.$_infowindow.setMap(null)
			}
		},
	}
</script>

<template>
	<label>
		<span class="label" v-if="label"></span>
		<input type="text" ref="input" :placeholder="placeholder" :class="inputClass"/>
	</label>
</template>
<script>
	import MapElement from '../mixins/MapElement'

	const boundProps = []

	const redirectedEvents = [
		// 'places_changed'
	]

	export default {
		mixins: [
			MapElement,
		],

		props: {
			label: {
				type: String,
				default: null,

			},
			placeholder: {
				type: String,
			},
			inputClass: {
				type: String,
			},

		},
		googleMapsReady () {
			const options = Object.assign({}, this.$props)
			options.map = this.$_map

			this.$_searchBox = new window.google.maps.places.SearchBox(this.$refs.input, options)

			this.bindProps(this.$_searchBox, boundProps)
			this.redirectEvents(this.$_searchBox, redirectedEvents)

			this.listen(this.$_searchBox, 'places_changed', () => {
				this.$emit('places_changed', this.$_searchBox.getPlaces())
			})
		},
		beforeDestroy () {
		},
	}
</script>

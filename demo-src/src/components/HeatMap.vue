<template>
	<div class="simple-map demo">
		<!-- Toolbar -->
		<md-toolbar>
			<md-button
				class="md-icon-button"
				@click="toggleSideNav"
			>
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title" style="flex: 1;">Simple map</h2>

			<md-button
				class="md-icon-button"
				:disabled="!userPosition"
				@click="centerOnUser"
			>
				<md-icon>my_location</md-icon>
			</md-button>
		</md-toolbar>

		<!-- Map -->
		<googlemaps-map
			ref="map"
			class="map"
			:center.sync="center"
			:zoom.sync="zoom"
		>
			<googlemaps-heatmap :data="heatmapData"></googlemaps-heatmap>

		</googlemaps-map>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				center: {
					lat: 37.782551,
					lng: -122.445368,
				},
				userPosition: null,
				zoom: 15,
				heatmapData: [
					{
						lat: 37.782551,
						lng: -122.445368,
						weight: 5,
					},
					{
						lat: 37.782745,
						lng: -122.444586,
						weight: 2,
					},
					{
						lat: 37.782842,
						lng: -122.443688,
						weight: 4,
					},
					{
						lat: 37.782919,
						lng: -122.442815,
						weight: 0.5,
					},
					{
						lat: 37.782919,
						lng: -122.442815,
						weight: 0.5,
					},
					{
						lat: 37.782919,
						lng: -122.442815,
						weight: 0.5,
					},
					{
						lat: 37.783206,
						lng: -122.440829,
					},
					{
						lat: 37.754665,
						lng: 122.403242,
					},
				],
			}
		},

		methods: {
			...mapActions('layout', [
				'toggleSideNav',
			]),

			centerOnUser () {
				if (this.userPosition) {
					this.center = this.userPosition
				}
			},

			setUserPosition (position) {
				this.userPosition = position
			},

		},
	}
</script>

<style lang="stylus" scoped>
	.demo {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.map {
		flex: 100% 1 1;
	}
</style>


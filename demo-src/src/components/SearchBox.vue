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
			<googlemaps-search-box slot="visible" placeholder="请输入地址或经纬度" :inputClass="mapInputClass" @places_changed="handlePlacesChanged"></googlemaps-search-box>

			<!-- Marker -->
			<googlemaps-marker
				v-if="marker"
				title="Paris"
				:position="{lat: marker.lat, lng: marker.lng}"
				@click="clickMarker()">
				<googlemaps-infowindow :opened.sync="marker.open">
					<div class="popover">
						<div>位置：{{marker.name}}</div>
						<div>经度：{{marker.lng}}</div>
						<div>纬度：{{marker.lat}}</div>
					</div>
				</googlemaps-infowindow>
			</googlemaps-marker>

		</googlemaps-map>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				center: {
					lat: 48.853,
					lng: 2.298,
				},
				userPosition: null,
				zoom: 4,
				mapInputClass: 'map-search-input',
				marker: null,
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
			clickMarker () {
				this.$set(this.marker, 'open', true)
			},
			handlePlacesChanged (places) {
				if (places.length === 0) {
					alert('无搜索结果')
					return
				}
				let place = places[0]
				if (!place.geometry) {
					alert('无该地理位置信息')
					return
				}
				this.center = place.geometry.location
				this.zoom = 7
				this.marker = {
					name: place.name,
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				}
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
<style lang="stylus">
	.map-search-input {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 20px;
		height: 32px;
		line-height: 32px;
		padding: 0 10px;
		border-radius: 3px;
		border: 1px solid #ccc;
		width: 300px;
		&:focus {
			 outline: none;
		 }
	}
</style>


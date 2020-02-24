import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

const ContactMap = (props) => {
	const [showingInfoWindow, setShowingInfoWindow] = useState(false)
	const [activeMarker, setActiveMarker] = useState({})
	const [selectedPlace, setSelectedPlace] = useState({})

	const onMarkerClick = (props, marker) => {
		setSelectedPlace(props)
		setActiveMarker(marker)
		setShowingInfoWindow(true)
	}

	const onClose = () => {
		if (showingInfoWindow) {
			setActiveMarker(null)
			setShowingInfoWindow(false)
		}
	}

	return (
		<Map
			google={props.google}
			zoom={props.zoom}
			style={props.mapStyles}
			initialCenter={props.initialCenter}
		>
			{props.departments.map(department => (
				<Marker
					onClick={onMarkerClick}
					position={{ lat: department.latitude, lng: department.longitude }}
					key={department.id}
					name={department.name}
					address={department.address}
					phone={department.phone}
				/>
			))}
			<InfoWindow
				marker={activeMarker}
				visible={showingInfoWindow}
				onClose={onClose}
			>
				<div className="marker-info">
					<ul>
						<li>
							<strong>{selectedPlace.name}</strong>
						</li>
						<li>
							{selectedPlace.address}
						</li>
						<li>
							{selectedPlace.phone}
						</li>
					</ul>
				</div>
			</InfoWindow>
		</Map>
	)
}

export default GoogleApiWrapper({
	// eslint-disable-next-line
	apiKey: process.env.REACT_APP_MAPS_API_KEY
})(ContactMap)

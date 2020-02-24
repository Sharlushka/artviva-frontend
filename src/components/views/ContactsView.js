import React from 'react'
import ContactMap from '../common/ContactMap'
import { departments } from '../../data/departments.json'

const ContactsView = () => {
	const mapStyles = {
		height: '70%',
		width: '100%',
		position: 'fixed',
		top: '8rem'
	}

	const initialCenter= {
		lat: 50.454760,
		lng: 30.143868
	}

	return (
		<>
			<ContactMap
				mapStyles={mapStyles}
				initialCenter={initialCenter}
				zoom={11}
				departments={departments}
			/>
			<h1 className="custom-font moar-padding-top">Філії</h1>
		</>
	)
}

export default ContactsView

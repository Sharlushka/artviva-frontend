import React from 'react'

import { Container, Row } from 'react-bootstrap'
import SectionLink from './SectionLink'

const SchoolDataNav = () => {

	const schoolSectionsLinks = [
		/*{
			to: '/school/overview',
			label: 'Взагалі'
		},*/
		{
			to: '/school/classes',
			label: 'Класи'
		},
		{
			to: '/school/teachers',
			label: 'Вчителі'
		},
		{
			to: '/school/pupils',
			label: 'Учні'
		},
		{
			to: '/school/specialties',
			label: 'Спеціальності'
		},
		{
			to: '/school/branches',
			label: 'Філії'
		},
		{
			to: '/school/payments',
			label: 'Дані по оплаті'
		}
	]

	return (
		<Container>
			<Row className="d-flex justify-content-center">
				{schoolSectionsLinks.map(link =>
					<SectionLink
						key={link.label}
						className="py-2 px-3 section-link"
						to={link.to}
						label={link.label}
					/>
				)}
			</Row>
		</Container>
	)
}

export default SchoolDataNav

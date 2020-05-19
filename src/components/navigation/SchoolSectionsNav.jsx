import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import SectionLink from './SectionLink'

const SchoolDataNav = () => {

	const schoolSectionsLinks = [
		{
			to: '/school/overview',
			label: 'Взагалі'
		},
		{
			to: '/school/classes',
			label: 'Класи'
		},
		{
			to: '/school/teachers',
			label: 'Вчітелі'
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
		<Container className="border1 border-success">
			<Row className="d-flex justify-content-around1 border1 border-primary">
				{/*<Col className="border1 border-success1">*/}
				{schoolSectionsLinks.map(link =>
					<SectionLink
						key={link.label}
						className="border1 border-success py-2 px-3 section-link"
						to={link.to}
						label={link.label}
					/>
				)}
				{/*<Link to="/school/overview">Взагалі</Link>
					<Link to="/school/teachers">Вчітелі</Link>
					<Link to="/school/classes">Класи</Link>
					<Link to="/school/pupils">Учні</Link>
					<Link to="/school/specialties">Спеціальності</Link>
					<Link to="/school/branches">Філії</Link>
					<Link to="/school/payments">Дані по оплаті</Link>*/}

				{/*</Col>*/}
			</Row>
		</Container>
	)
}

export default SchoolDataNav

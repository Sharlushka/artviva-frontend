import React from 'react'
import { Card, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from '@fortawesome/free-solid-svg-icons'

const DepartmentCard = ({ department }) => {

	const iconStyle = 'department-icon fa-sm mr-2'

	return (
		<Card
			id={department.id}
			bg="light"
			style={{ width: '22rem' }}
			className="mb-4 default-shadow"
		>
			<Card.Header>
				<FontAwesomeIcon icon={faSchool} className={iconStyle} />
				{department.town}
			</Card.Header>
			<Card.Body>
				<Card.Title>
					{department.name}
				</Card.Title>
				{department.image
					? <Image
						src={`img/departments/${department.image}`}
						fluid
						rounded
						thumbnail
					/>
					: null
				}
				<Card.Text>
					{department.info}
				</Card.Text>
				<Card.Text>
					{department.phone}
				</Card.Text>
				<Card.Text>
					{department.address}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default DepartmentCard

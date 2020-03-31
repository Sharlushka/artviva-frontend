import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import * as data from '../../data/teachers'
import TeacherCard from '../teachers/TeacherCard'
import Department from '../teachers/Department'
import { shuffle } from '../../utils/shuffleArray'

const TeachersView = ({ match }) => {
	const [administration, setAdministration] = useState(null)
	const [departments, setDepartments] = useState(null)

	useEffect(() => {
		setAdministration(data.administration)
		setDepartments(data.departments)
	}, [setAdministration, setDepartments])

	return (
		<Container className="pt-5">
			<h3 className="text-center custom-font pt-4 pb-2">
				Адміністрація
			</h3>
			<Row className="p-2 d-flex justify-content-center">
				<Col xs={12} className="p-0">
					{administration
						? administration.map(person =>
							<TeacherCard key={person.id} person={person} />)
						: null
					}
				</Col>
				<h3 className="custom-font pt-4 pb-2">
					Наші вчітели
				</h3>
				<Col xs={12} className="p-0">
					{departments
						? departments.map(department =>
							<Department
								key={department.id}
								name={department.name}
								teachers={shuffle(department.teachers)}
								scrollTo={match.params.department}
							/>)
						: null
					}
				</Col>
			</Row>
		</Container>
	)
}

export default TeachersView

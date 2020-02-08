import React, { useState } from 'react'
import { Row, Col, Card, Image, Collapse } from 'react-bootstrap'
import { ReactComponent as FbIcon } from '../../svg/facebook.svg'

const TeacherCard = ({ teacher }) => {
	const [open, setOpen] = useState(false)

	const openTeacherDescr = () => {
		setOpen(!open)
	}

	return (
		<Card key={teacher.id} className="my-4">
			<Card.Body>
				<Row className="d-flex justify-content-center">
					<Col xs={7} sm={2} className="py-4">
						<Image
							src={`img/teachers/${teacher.image}`}
							className="teacher-avatar"
						/>
					</Col>
					<Col xs={12} sm={10}>
						<ul className="teacher-specs-list">
							<li>
								<strong className="custom-font teacher-name">
									{teacher.name}
								</strong>
							</li>
							<li>
								<em className="text-muted">Освіта: </em>
								{teacher.education}
							</li>
							<li>
								<em className="text-muted">Предмет: </em>
								{teacher.speciality}
							</li>
							<li>
								{ teacher.description
									? <>
										<p>
											{teacher.description.intro}
										</p>
										<Collapse in={open}>
											<p id="more-info" className="text-left">
												{teacher.description.more}
											</p>
										</Collapse>
										<div className="text-right">
											<button
												className="more-teacher-info"
												onClick={() => openTeacherDescr()}
												aria-controls="more-info"
												aria-expanded={open}
											>
												{ open
													? <em>меньше...</em>
													: <em>більше...</em>
												}
											</button>
										</div>
									</>
									: null
								}
							</li>
						</ul>
						{ teacher.social
							?
							teacher.social.map(social =>
								<a key={social.link} href={social.link}>
									<FbIcon className="teacher-social-icon" />
								</a>
							)
							: null
						}
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default TeacherCard

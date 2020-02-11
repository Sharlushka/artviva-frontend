import React, { useState } from 'react'
import { Row, Col, Card, Image, Collapse } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

const TeacherCard = ({ teacher }) => {
	const [open, setOpen] = useState(false)

	const openTeacherDescr = () => {
		setOpen(!open)
	}

	const showIcon = (icon) => {
		const iconStyle = 'teacher-social-icon fa-lg mx-1'

		switch (icon) {
		case 'facebook':
			return <FontAwesomeIcon icon={faFacebookF} className={iconStyle} />
		case 'instagram':
			return <FontAwesomeIcon icon={faInstagram} className={iconStyle} />
		default:
			return null
		}
	}

	return (
		<Card key={teacher.id} className="my-4">
			<Card.Body>
				<Row className="d-flex justify-content-center">
					<Col xs={7} sm={2} className="p-2 pl-3">
						<Image
							src={`img/teachers/${teacher.image}`}
							className="teacher-avatar"
						/>
					</Col>
					<Col xs={12} sm={10}>
						<ul className="teacher-specs-list">
							<li className="d-flex justify-content-between align-items-center">
								<strong className="custom-font teacher-name text-left">
									{teacher.name}
								</strong>
								<span className="d-flex justify-content-end">
									{ teacher.social
										?
										teacher.social.map(social =>
											<a key={social.link} href={social.link}>
												{showIcon(social.icon)}
											</a>
										)
										: null
									}
								</span>
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
													? <em><FontAwesomeIcon icon={faAngleUp} /></em>
													: <em>більше...</em>
												}
											</button>
										</div>
									</>
									: null
								}
							</li>
						</ul>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default TeacherCard

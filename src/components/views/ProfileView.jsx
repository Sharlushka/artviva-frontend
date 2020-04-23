import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Tabs, Tab, ListGroup } from 'react-bootstrap'
import NewTeacherForm from '../forms/NewTeacherForm'
import NewBranchForm from '../forms/NewBranchForm'
import NewSpecialtyForm from '../forms/NewSpecialtyForm'
import Toggler from '../common/Toggler'
import TeachersList from '../teachers/TeachersList'
import BranchesList from '../branches/BranchesList'
import SpecialtiesList from '../specialties/SpecialtiesList'

const ProfileView = ({ user }) => {
	const newTeacherFormRef = useRef(null)
	const newBranchFormRef = useRef(null)
	const newSpecialtyFormRef = useRef(null)

	return (
		<>
			{ user ?
				<Container fluid className="pt-4 text-center">
					<Row className="pt-4">
						<Col xs={12}>
							<h4 className="text-left custom-font py-4">
								Ваш профіль, {user.name}.
							</h4>
							<Tabs defaultActiveKey="teachers" id="profileTabs">
								{/* Profile tab */}
								<Tab eventKey="profile" title="Профіль" className="profile-tab">
									<ListGroup variant="flush">
										<ListGroup.Item>
											{user.name} {user.middlename} {user.lastname}
										</ListGroup.Item>
										<ListGroup.Item>
											{user.email}
										</ListGroup.Item>
										<ListGroup.Item>
											{user.id}
										</ListGroup.Item>
									</ListGroup>
								</Tab>

								{/* Teachers list tab */}
								<Tab eventKey="teachers" title="Вчителі">
									<Col className="px-0">
										<TeachersList />
									</Col>
									<Container fluid>
										<Row className="d-flex justify-content-center">
											<Col md={8} lg={6} xl={4}>
												<Toggler
													buttonLabel="Додати нового вчітеля"
													data-cy="add-new-branch-btn"
													ref={newTeacherFormRef}
												>
													<NewTeacherForm />
												</Toggler>
											</Col>
										</Row>
									</Container>
								</Tab>

								{/* Branches list tab */}
								<Tab eventKey="branch" title="Філії">
									<Col className="px-0">
										<BranchesList />
									</Col>
									<Container fluid>
										<Row className="d-flex justify-content-center">
											<Col md={8} lg={6} xl={4}>
												<Toggler
													buttonLabel="Додати нову філію"
													data-cy="add-new-branch-btn"
													ref={newBranchFormRef}
												>
													<NewBranchForm />
												</Toggler>
											</Col>
										</Row>
									</Container>
								</Tab>

								{/* Specialties List tab */}
								<Tab eventKey="specialties" title="Cпеціальності">
									<Col className="px-0">
										<SpecialtiesList />
									</Col>
									<Container fluid>
										<Row className="d-flex justify-content-center">
											<Col md={8} lg={6} xl={4}>
												<Toggler
													buttonLabel="Додати нову спеціальність"
													data-cy="add-new-specialty-btn"
													ref={newSpecialtyFormRef}
												>
													<NewSpecialtyForm />
												</Toggler>
											</Col>
										</Row>
									</Container>
								</Tab>
							</Tabs>
						</Col>
					</Row>
				</Container>
				: null
			}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(ProfileView)

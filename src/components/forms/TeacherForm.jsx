import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createTeacher, updateTeacher } from '../../reducers/teachersReducer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import teachersService from '../../services/teachers'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const TeacherForm = ({
	teacher,
	user,
	specialties,
	setNotification,
	createTeacher,
	updateTeacher,
	mode }) => {

	const [editMode, setEditMode] = useState(false)
	const [specialtyListData, setSpecialtyListData] = useState([])
	const [unusedSpecialties, setUnusedSpecialties] = useState([])
	const [specialtyError, setSpecialtyError] = useState(false)

	useEffect(() => {
		setSpecialtyListData(specialties.map(specialty => specialty.title))
		teachersService.setToken(user.token)
	}, [user, specialties])

	useEffect(() => {
		if (mode === 'edit') {
			setEditMode(true)
			const fullList = new Set(specialties.map(specialty => specialty.title))
			const used = new Set(teacher.specialties.map(specialty => specialty.title))
			const difference = new Set([...fullList].filter((item) => !used.has(item)))
			setUnusedSpecialties(Array.from(difference))
		}
	// eslint-disable-next-line
	}, [])

	const teacherFormSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повнe ім\'я.'),
		specialties: Yup.array().of(
			Yup.string()
				.oneOf(specialtyListData, 'Ви повинні вибрати не менше одного фаху.')
				.required('Це поле є обов\'язковим.')
		)
	})

	const checkSubmitBtnState = ({ specialties }) => {
		specialties[0] === ''
			? setSpecialtyError(true)
			: setSpecialtyError(false)
	}

	const handleTeacher = (values, setErrors, resetForm) => {
		// check if specialty was added
		if (values.specialties.length === 0) {
			setSpecialtyError(true)
			return
		}
		// get selected specialties id's
		const uniqueSpecialties = new Set(values.specialties)
		let specialtiesIds = []
		uniqueSpecialties.forEach(title => {
			const index = specialties.findIndex(specialty => specialty.title === title)
			specialtiesIds.push(specialties[index].id)
		})
		// replace specialties in values with their newly found ids
		// ---- this really should have to be a new object with new values ----
		values.specialties = specialtiesIds

		// if current from mode is edit or create..
		editMode
			? saveTeacherEdits(values, setErrors)
			: addNewTeacher(values, setErrors, resetForm)
	}

	const addNewTeacher = (values, setErrors, resetForm) => {
		createTeacher(values)
			.then(() => {
				setNotification({
					message: 'Новий вчітель був успішно додан.',
					variant: 'success'
				}, 5)
				resetForm()
			})
			.catch(error => {
				const { message, cause } = { ...error.response.data }
				if (cause === 'name') {
					setErrors({ title: message })
				}
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
	}

	const saveTeacherEdits = (values, setErrors) => {
		updateTeacher(teacher.id, values)
			.then(() => {
				setNotification({
					message: 'Зміни успішно збережено.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				const { message, cause } = { ...error.response.data }
				if (cause === 'name') {
					setErrors({ title: message })
				}
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
	}

	return (
		<Container>
			<h2 className="text-center custom-font py-4">
				{editMode ? 'Редагувати' : 'Додати'} вчітеля
			</h2>
			<Formik
				initialValues={{
					name: editMode ? teacher.name : '',
					specialties: editMode
						? teacher.specialties.map(specialty => specialty.title)
						: ['']
				}}
				enableReinitialize
				onSubmit={async (values, { resetForm, setErrors }) => {
					await handleTeacher(values, setErrors, resetForm)
				}}
				validationSchema={teacherFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors,
				}) => (
					<Form
						data-cy="new-teacher-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Teacher name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={editMode ? `teacher-name-input-${teacher.id}` : 'teacher-name-input'}
								as={Col}
								className="mb-4"
							>
								<Form.Label>
									Полне ім&apos;я вчітеля
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									data-cy="name-input"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									isValid={touched.name && !errors.name}
									isInvalid={touched.name && !!errors.name}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						<FieldArray
							name="specialties"
							render={arrayHelpers => (
								<>
									{values.specialties && values.specialties.length > 0 ? (
										values.specialties.map((specialty, index) => (
											<Form.Row key={index} className="d-flex justify-content-end border1 border-primary">
												<Col xs={12}>
													<Form.Control
														as="select"
														className="mb-2"
														name={`specialties[${index}]`}
														value={values.specialties[index]}
														onChange={handleChange}
														isValid={touched.specialties && !errors.specialties}
														// isInvalid={touched.specialties && !!errors.specialties}
													>
														{editMode
															? <>
																{teacher.specialties.map((specialty) =>
																	<option value={specialty.title} key={specialty.title}>{specialty.title}</option>
																)}
																{unusedSpecialties.map(specialty =>
																	<option value={specialty} key={specialty}>{specialty}</option>
																)}
															</>
															: <>
																<option>Виберіть...</option>
																{specialtyListData.map(specialty =>
																	<option value={specialty} key={specialty}>{specialty}</option>
																)}
															</>
														}
													</Form.Control>
												</Col>

												<Col xs={8}>
													<ErrorMessage
														name={`specialties[${index}]`}
														className="border border-primary"
														render={msg => (
															<span className="form-validation-error-mk2">
																{msg}
															</span>
														)}
													/>
												</Col>

												<Col xs={4} className="my-2 align-items-end border1 border-secondary">
													<Row className="d-flex justify-content-center">
														<Col className="pr-1">
															{/* remove specialty from the list */}
															<Button
																block
																variant="outline-danger" size="sm"
																onClick={() => {
																	arrayHelpers.remove(index)
																	checkSubmitBtnState(arrayHelpers.form.values) }}
															>
																<FontAwesomeIcon icon={faMinus} />
															</Button>
														</Col>
														<Col className="pl-1">
															{/* add an empty input */}
															<Button
																block
																variant="outline-success" size="sm"
																onClick={() => { arrayHelpers.push('')
																	checkSubmitBtnState(arrayHelpers.form.values)} }
															>
																<FontAwesomeIcon icon={faPlus} />
															</Button>
														</Col>
													</Row>
												</Col>
											</Form.Row>
										))
									) : (
										<Button
											className="my-2"
											variant={specialtyError ? 'outline-danger' : 'outline-primary'}
											onClick={() => {
												arrayHelpers.push('')
												checkSubmitBtnState(arrayHelpers.form.values) }}>
											{/* show this btn when if user has removed all specialties from the list */}
											Додати фах
										</Button>
									)}
								</>
							)}
						/>

						{/* Button */}
						<Form.Row className="d-flex justify-content-center text-center">
							<Form.Group
								as={Col}
								className="pt-4"
							>
								<ButtonComponent
									block
									className="px-4 primary-color-shadow"
									variant="primary"
									type="submit"
									label="Додати"
									disabled={specialtyError}
								/>
							</Form.Group>
						</Form.Row>
					</Form>
				)}
			</Formik>
		</Container>
	)
}

TeacherForm.propTypes = {
	teacher: PropTypes.object,
	user: PropTypes.object.isRequired,
	specialties: PropTypes.array.isRequired,
	setNotification: PropTypes.func.isRequired,
	createTeacher: PropTypes.func.isRequired,
	updateTeacher: PropTypes.func.isRequired,
	mode: PropTypes.oneOf(['create', 'edit']).isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		specialties: state.specialties
	}
}

const mapDispatchToProps = {
	setNotification,
	createTeacher,
	updateTeacher
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeacherForm)

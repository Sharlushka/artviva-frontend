import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createPupil } from '../../reducers/pupilsReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import pupilsService from '../../services/pupils'
import * as Yup from 'yup'

const NewPupilForm = ({ user, setNotification, createPupil }) => {

	// set auth token
	useEffect(() => {
		pupilsService.setToken(user.token)
	}, [user])

	const addNewTeacher = (values, setErrors, resetForm ) => {
		createPupil(values)
			.then(() => {
				setNotification({
					message: 'Новий учень був успішно додан.',
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

	const pupilFormSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повнe ім\'я.'),
		info: Yup.string()
			.min(3, 'Не менш 3 символів.')
			.max(255, 'Максимум 255 символів.')
	})

	return (
		<Container>
			<h2 className="text-center custom-font py-4">
				Додати учня
			</h2>
			<Formik
				initialValues={{
					name: '',
					info: ''

				}}
				onSubmit={async (values, { resetForm, setErrors }) => {
					await addNewTeacher(values, setErrors, resetForm)
				}}
				validationSchema={pupilFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors
				}) => (
					<Form
						data-cy="new-pupil-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Pupil name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="pupil-name-input"
								as={Col}
							>
								<Form.Label>
									Полне ім&apos;я учня
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
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Pupil info / descr input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="pupil-info-input"
								as={Col}
							>
								<Form.Label>
									Додаткова інформація / опис
								</Form.Label>
								<Form.Control
									as="textarea"
									name="info"
									rows="3"
									data-cy="pupil-info-input"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.info}
									isValid={touched.info && !errors.info}
									isInvalid={touched.info && !!errors.info}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.info}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

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
								/>
							</Form.Group>
						</Form.Row>
					</Form>
				)}
			</Formik>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	createPupil
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewPupilForm)

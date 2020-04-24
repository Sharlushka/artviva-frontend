import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { updatePupil } from '../../reducers/pupilsReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import pupilsService from '../../services/pupils'
import * as Yup from 'yup'

const EditPupilForm = ({ user, setNotification, updatePupil, pupil }) => {

	// set auth token
	useEffect(() => {
		pupilsService.setToken(user.token)
	}, [user])

	const savePupilEdits = (values, setErrors) => {
		updatePupil(pupil.id, values)
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
				Редагувати данні вчітеля
			</h2>
			<Formik
				initialValues={{
					name: pupil.name,
					info: pupil.info
				}}
				onSubmit={async (values, { setErrors }) => {
					await savePupilEdits(values, setErrors)
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
						data-cy="edit-pupil-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Pupil name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${pupil.id}-pupil-name-input`}
								as={Col}
							>
								<Form.Label>
									Ім&apos;я
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									data-cy="pupil-name-input"
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
								controlId={`${pupil.id}-pupil-info-input`}
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
									className="px-4"
									variant="success"
									type="submit"
									label="Зберегти"
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
	updatePupil
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPupilForm)

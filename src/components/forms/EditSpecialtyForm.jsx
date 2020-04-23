import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { updateSpecialty } from '../../reducers/specialtiesReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import specialtyService from '../../services/branches'

const EditSpecialtyForm = ({ user, setNotification, updateSpecialty, specialty }) => {

	const specialtyFormSchema = Yup.object().shape({ // move this somewhere!
		title: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повну назву філії.'),
		cost: Yup.number()
			.typeError('Повинно бути числом.')
			.required('Обов\'язкове поле.')
			.positive('Повинно бути більше нуля.')
			.integer('Повинно бути цілим числом.'),
		info: Yup.string()
			.min(3, 'Не менш 3 символів.')
			.max(255, 'Максимум 255 символів.')
			.required('Введіть опис.')
	})

	// set auth token
	useEffect(() => {
		specialtyService.setToken(user.token)
	}, [user])

	const saveSpecialtyEdits = (values, setErrors) => {
		console.log('Sending this', values)
		updateSpecialty(specialty.id, values)
			.then(() => {
				setNotification({
					message: 'Зміни успішно збережено.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				const { message, cause } = { ...error.response.data }
				if (cause === 'title') {
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
				Редагувати спеціальність
			</h2>
			<Formik
				initialValues={{
					title: specialty.title,
					cost: specialty.cost,
					info: specialty.info
				}}
				onSubmit={async (values, { setErrors }) => {
					await saveSpecialtyEdits(values, setErrors)
				}}
				validationSchema={specialtyFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors
				}) => (
					<Form
						data-cy="edit-specialty-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Specialty title input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${specialty.id}-specialty-title-input`}
								as={Col}
							>
								<Form.Label>
									Полна назва спеціальності
								</Form.Label>
								<Form.Control
									type="text"
									name="title"
									data-cy="title-input"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.title}
									isValid={touched.title && !errors.title}
									isInvalid={touched.title && !!errors.title}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.title}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Specialty cost input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${specialty.id}-specialty-cost-input`}
								as={Col}
							>
								<Form.Label>
									Вартість навчання за місяць
								</Form.Label>
								<Form.Control
									type="text"
									name="town"
									data-cy="specialty-cost-input"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.cost}
									isValid={touched.cost && !errors.cost}
									isInvalid={touched.cost && !!errors.cost}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.cost}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Specilaty info / descr input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${specialty.id}-specialty-info-input`}
								as={Col}
							>
								<Form.Label>
									Додаткова інформація / опис
								</Form.Label>
								<Form.Control
									as="textarea"
									name="info"
									rows="3"
									data-cy="specialty-info-input"
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
	updateSpecialty
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditSpecialtyForm)

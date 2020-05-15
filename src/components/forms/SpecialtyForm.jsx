import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createSpecialty, updateSpecialty } from '../../reducers/specialtiesReducer'
import specialtyService from '../../services/specialties'

import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'

const SpecialtyForm = ({
	specialty,
	user,
	setNotification,
	createSpecialty,
	updateSpecialty,
	mode }) => {

	const [editMode, setEditMode] = useState(false)

	// set auth token and mode
	useEffect(() => {
		specialtyService.setToken(user.token)
		if (mode === 'edit') {
			setEditMode(true)
		}
	}, [user, mode])

	// edit or save
	const handleSpecialty = (values, setErrors, resetForm) => {
		editMode
			? existingSpecialty(values)
			: newSpecialty(values, setErrors, resetForm)
	}

	const newSpecialty = (values, setErrors, resetForm) => {
		createSpecialty(values)
			.then(() => {
				setNotification({
					message: 'Нова спеціальність була успішно додана.',
					variant: 'success'
				}, 5)
				resetForm()
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

	const existingSpecialty = (values) => {
		updateSpecialty(specialty.id, values)
			.then(() => {
				setNotification({
					message: 'Зміни успішно збережено.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				const { message } = { ...error.response.data }
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
	}

	// form data
	const initialFormValues = () =>
		editMode ? { ...specialty } : { title: '', cost: '', info: '' }

	const specialtyFormSchema = Yup.object().shape({
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
			// .required('Введіть опис.')
	})

	return (
		<Container>
			<h2 className="text-center custom-font py-4">
				{editMode ? 'Редагувати' : 'Додати'} спеціальність
			</h2>
			<Formik
				initialValues={initialFormValues()}
				enableReinitialize
				onSubmit={async (values, { resetForm, setErrors }) => {
					await handleSpecialty(values, setErrors, resetForm)
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
						data-cy="specialty-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Specialty title input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={editMode
									? `specialty-title-input-${specialty.id}`
									: 'specialty-title-input'}
								as={Col}
							>
								<Form.Label>
									Полна назва спеціальності
									<span className="form-required-mark"> *</span>
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
								controlId={editMode
									? `specialty-cost-input-${specialty.id}`
									: 'specialty-cost-input'}
								as={Col}
							>
								<Form.Label>
									Вартість навчання за місяць
									<span className="form-required-mark"> *</span>
								</Form.Label>
								<Form.Control
									type="text"
									name="cost"
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
								controlId={editMode
									? `specialty-info-input-${specialty.id}`
									: 'specialty-info-input'}
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

SpecialtyForm.propTypes = {
	specialty: PropTypes.object,
	user: PropTypes.object.isRequired,
	setNotification: PropTypes.func.isRequired,
	createSpecialty: PropTypes.func.isRequired,
	updateSpecialty: PropTypes.func.isRequired,
	mode: PropTypes.oneOf(['create', 'edit']).isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	createSpecialty,
	updateSpecialty
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SpecialtyForm)

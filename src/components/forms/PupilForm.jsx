import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createPupil, updatePupil } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'

import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'

const PupilForm = ({
	pupil,
	user,
	setNotification,
	createPupil,
	updatePupil,
	mode }) => {

	const [editMode, setEditMode] = useState(false)

	// set auth token and mode
	useEffect(() => {
		pupilsService.setToken(user.token)
		if (mode === 'edit') {
			setEditMode(true)
		}
	}, [user, mode])

	// handle edit or create
	const handlePupil = (values, setErrors, resetForm) => {
		editMode
			? existingPupil(values, setErrors)
			: newPupil(values, setErrors, resetForm)
	}

	const newPupil = (values, setErrors, resetForm ) => {
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

	const existingPupil = (values, setErrors) => {
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

	// form data and schema
	const initialFormValues = () =>
		editMode ? { ...pupil } : { name: '', info: '' }

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
			<h4 className="text-center custom-font py-4">
				{editMode ? 'Редагувати' : 'Додати'} учня
			</h4>
			<Formik
				initialValues={initialFormValues()}
				enableReinitialize
				onSubmit={async (values, { resetForm, setErrors }) => {
					await handlePupil(values, setErrors, resetForm)
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
						data-cy="pupil-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Pupil name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={editMode
									? `pupil-name-input-${pupil.id}`
									: 'pupil-name-input'}
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
								controlId={editMode
									? `pupil-info-input-${pupil.id}`
									: 'pupil-info-input'}
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

PupilForm.propTypes = {
	pupil: PropTypes.object,
	user: PropTypes.object.isRequired,
	setNotification: PropTypes.func.isRequired,
	createPupil: PropTypes.func.isRequired,
	updatePupil: PropTypes.func.isRequired,
	mode: PropTypes.oneOf(['create', 'edit']).isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	createPupil,
	updatePupil
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PupilForm)
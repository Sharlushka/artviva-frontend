import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createTeacher } from '../../reducers/teachersReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import teachersService from '../../services/teachers'

const NewTeacherForm = ({ user, setNotification, createTeacher }) => {

	const teacherFormSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повнe ім\'я.')
	})

	// set auth token
	useEffect(() => {
		teachersService.setToken(user.token)
	}, [user])

	const addNewTeacher = (values, setErrors, resetForm ) => {
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

	return (
		<Container>
			<h2 className="text-center custom-font py-4">
				Додати вчітеля
			</h2>
			<Formik
				initialValues={{
					name: ''
				}}
				onSubmit={async (values, { resetForm, setErrors }) => {
					await addNewTeacher(values, setErrors, resetForm)
				}}
				validationSchema={teacherFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors
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
								controlId="teacher-title-input"
								as={Col}
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
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.name}
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
	createTeacher
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewTeacherForm)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { updateTeacher } from '../../reducers/teachersReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import teachersService from '../../services/teachers'

const EditTeacherForm = ({ user, setNotification, updateTeacher, teacher }) => {

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
				Редагувати данні вчітеля
			</h2>
			<Formik
				initialValues={{
					name: teacher.name
				}}
				onSubmit={async (values, { setErrors }) => {
					await saveTeacherEdits(values, setErrors)
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
						data-cy="edit-teacher-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Teacher name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${teacher.id}-specialty-title-input`}
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
	updateTeacher
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTeacherForm)

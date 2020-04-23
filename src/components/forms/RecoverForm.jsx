import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import passwordService from '../../services/password'
import { Col, Form, Button } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'


const RecoverForm = ({ setNotification }) => {

	const recoverFormSchema = Yup.object().shape({
		email: Yup.string()
			.email('Адреса електронної пошти недійсна.')
			.required('Введіть свою електронну пошту.')
	})

	const handleRecover = values => {
		console.log('Sending pass recovery email', values)
		passwordService.sendRecoveryEmail(values)
			.then(() => {
				setNotification({
					message: 'Інструкції щодо відновлення пароля були надіслані на вашу електронну адресу.',
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

	return (
		<Formik
			initialValues={{
				email: ''
			}}
			onSubmit={async (values, { resetForm }) => {
				await handleRecover(values)
				resetForm()
			}}
			validationSchema={recoverFormSchema}
		>
			{({ handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				errors
			}) => (
				<Form
					data-cy="recover-form"
					noValidate
					onSubmit={handleSubmit}
				>

					{/* User email input */}
					<Form.Row className="d-flex justify-content-center">
						<Form.Group as={Col} sm="8" md="6">
							<Form.Label>
								Ваша електронна пошта
							</Form.Label>
							<Form.Control
								type="email"
								name="email"
								data-cy="email-input"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								isValid={touched.email && !errors.email}
								isInvalid={touched.email && !!errors.email}
							/>
							<Form.Control.Feedback>
								Ok
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					{/* Button */}
					<Form.Row className="d-flex justify-content-center">
						<Form.Group
							as={Col}
							sm={8}
							className="d-flex pt-3
								justify-content-center
								align-items-center"
						>
							<Button
								type="submit"
								variant="primary"
								data-cy="recover-pass-btn"
								className="primary-color-shadow"
							>
								Надіслати скидання пароля
							</Button>
						</Form.Group>
					</Form.Row>
				</Form>
			)}
		</Formik>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecoverForm)

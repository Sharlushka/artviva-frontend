import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { Col, Form, Button } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'

// eslint-disable-next-line
const RecoverForm = ({ setNotification }) => {

	const recoverFormSchema = Yup.object().shape({
		email: Yup.string()
			.email('Адреса електронної пошти недійсна.')
			.required('Введіть свою електронну пошту.')
	})

	const handleRecover = values => {
		console.log('Sending pass recovery email', values)
		setNotification({
			message: `Сайт працює в тестовому режимі,
				тому ви не можете зараз відновити пароль,
				але дякуємо за участь у тестуванні сайту!`,
			variant: 'success'
		}, 5)
	}

	return (
		<Formik
			initialValues={{
				email: '',
				password: ''
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
				<Form data-cy="recoverForm"
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
								data-cy="emailInput"
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
							sm="8"
							className="d-flex pt-3
								justify-content-center
								align-items-center"
						>
							<Button
								type="submit"
								variant="primary"
								data-cy="recoverPassBtn"
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

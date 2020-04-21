import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createBranch } from '../../reducers/branchesReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'
import branchService from '../../services/branches'

const NewBranchForm = ({ user, setNotification, createBranch }) => {
	const phoneNumber = /^\+?([0-9]{0,2}) ?\(?([0-9]{0,3})\)? ?[-. ]?([0-9]{0,3})[-. ]?([0-9]{0,2})-?([0-9]{0,2})$/

	const branchFormSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повну назву філії.'),
		town: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть місто / село.'),
		address: Yup.string()
			.min(3, 'Не менш 3 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть адресу.'),
		phone: Yup.string()
			.min(3, 'Не менш 19 символів.')
			.max(19, 'Максимум 19 символів.')
			.matches(phoneNumber, 'Перевірте форматування, має бути: +XX (XXX) XXX-XX-XX')
			.required('Введіть номер телефону.'),
		info: Yup.string()
			.min(3, 'Не менш 3 символів.')
			.max(255, 'Максимум 255 символів.')
			.required('Введіть опис.')
	})

	// set auth token
	useEffect(() => {
		branchService.setToken(user.token)
	}, [user])

	const addNewBranch = ({ name, town, address, phone, info }, setErrors ) => {
		console.log('Adding')
		const branchData = {
			name,
			town,
			address,
			phone,
			info
		}
		createBranch(branchData) // values?!
			.then(() => {
				setNotification({
					message: 'Нова філія була успішно додана.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				const { message, cause } = { ...error.response.data }
				if (cause === 'name') {
					setErrors({ name: message })
				}
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
	}

	return (
		<Container className="pb-4">
			<h2 className="text-center custom-font py-4">
				Додати філію
			</h2>
			<Formik
				initialValues={{
					name: '',
					town: '',
					address: '',
					phone: '',
					info: ''
				}}
				onSubmit={async (values, { resetForm, setErrors }) => {
					await addNewBranch(values, setErrors)
					// if (registrationSuccessful) resetForm()
				}}
				validationSchema={branchFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors,
					setFieldValue
				}) => (
					<Form data-cy="registerForm"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Branch full name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="branchNameInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Полна назва філії
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									data-cy="nameInput"
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

						{/* Branch town input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="branchTownInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Город / село філії
								</Form.Label>
								<Form.Control
									type="text"
									name="town"
									data-cy="branchTownInput"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.town}
									isValid={touched.town && !errors.town}
									isInvalid={touched.town && !!errors.town}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.town}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Branch address input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="branchAddressInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Повна адреса
								</Form.Label>
								<Form.Control
									as="textarea"
									name="address"
									rows="2"
									data-cy="branchAddressInput"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.address}
									isValid={touched.address && !errors.address}
									isInvalid={touched.address && !!errors.address}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.address}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Branch phone number input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="branchPhoneInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Телефонний номер
								</Form.Label>
								<Form.Control
									type="text"
									name="phone"
									data-cy="branchPhoneInput"
									onChange={handleChange}
									onKeyUp={event => formatPhoneNumber(event, 'phone', setFieldValue)}
									onBlur={handleBlur}
									value={values.phone || ''}
									isValid={touched.phone && !errors.phone}
									isInvalid={touched.phone && !!errors.phone}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.phone}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Branch info / descr input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="branchInfoInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Додаткова інформація / опис
								</Form.Label>
								<Form.Control
									as="textarea"
									name="info"
									rows="3"
									data-cy="branchInfoInput"
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
								className="col-md-10 col-lg-7 pt-4"
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
	createBranch
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewBranchForm)

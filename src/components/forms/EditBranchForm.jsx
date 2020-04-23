import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { updateBranch } from '../../reducers/branchesReducer'
import { Container, Col, Form } from 'react-bootstrap'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'
import branchService from '../../services/branches'

const EditBranchForm = ({ user, setNotification, updateBranch, branch }) => {
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

	const saveBranchEdits = (values, setErrors) => {
		updateBranch(branch.id, values)
			.then(() => {
				setNotification({
					message: 'Зміни успішно збережено.',
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
		<Container fluid>
			<h2 className="text-center custom-font py-4">
				Редагувати філію
			</h2>
			<Formik
				initialValues={{
					name: branch.name,
					town: branch.town,
					address: branch.address,
					phone: branch.phone,
					info: branch.info
				}}
				onSubmit={async (values, { setErrors }) => {
					await saveBranchEdits(values, setErrors)
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
					<Form
						data-cy="edit-branch-form"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/* Branch full name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${branch.id}-branch-name-input`}
								as={Col}
							>
								<Form.Label>
									Полна назва філії
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

						{/* Branch town input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId={`${branch.id}-branch-town-input`}
								as={Col}
							>
								<Form.Label>
									Город / село філії
								</Form.Label>
								<Form.Control
									type="text"
									name="town"
									data-cy="branch-town-input"
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
								controlId={`${branch.id}-branch-address-input`}
								as={Col}
							>
								<Form.Label>
									Повна адреса
								</Form.Label>
								<Form.Control
									as="textarea"
									name="address"
									rows="2"
									data-cy="branch-address-input"
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
								controlId={`${branch.id}-branch-phone-input`}
								as={Col}
							>
								<Form.Label>
									Телефонний номер
								</Form.Label>
								<Form.Control
									type="text"
									name="phone"
									data-cy="branch-phone-input"
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
						<Form.Row className="d-flex justify-content-center pb-4">
							<Form.Group
								controlId={`${branch.id}-branch-info-input`}
								as={Col}
							>
								<Form.Label>
									Додаткова інформація / опис
								</Form.Label>
								<Form.Control
									as="textarea"
									name="info"
									rows="3"
									data-cy="branch-info-input"
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
	updateBranch
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditBranchForm)

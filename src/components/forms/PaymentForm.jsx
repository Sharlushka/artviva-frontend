import React, { useState, useEffect, useRef } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import paymentService from '../../services/payment'
import { setNotification } from '../../reducers/notificationReducer'
import { Formik, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHryvnia } from '@fortawesome/free-solid-svg-icons'
import { schoolYearMonths } from '../../utils/datesAndTime'

const PaymentForm = () => {

	let [orderData, setOrderData] = useState({
		teacher: null,
		specialty: null,
		months: [],
		baseCost: 200,
		total: null
	})
	const [total, setTotal] = useState(null)

	// calculate total to show when filling the form
	const processOrderData = ({ target }) => {
		let months
		let position
		switch (target.name) {
		case 'teacher':
			setOrderData({ ...orderData, teacher: target.value })
			break
		case 'specialty':
			setOrderData({ ...orderData, specialty: target.value })
			break
		case 'months':
			months = orderData.months
			position = months.indexOf(target.value)
			if ( ~position ) {
				months.splice(position, 1)
			} else {
				months.push(target.value)
			}
			setOrderData({ ...orderData, months })
			console.log('Result', orderData.months)
			break
		default:
			return
		}
	}

	// when order data changes, calculate total
	useEffect(() => {
		const { teacher, specialty, months, baseCost } = orderData
		const preliminaryPaymentData = () => teacher && specialty && months ? true : false

		if (preliminaryPaymentData()) {
			setTotal(baseCost * months.length)
		}
	}, [orderData])

	const paymentFormEl = useRef(null)
	const [liqpayData, setLiqpayData] = useState({})

	// Send generate and send data to liqpay
	const handlePayment = async ({ teacher, pupil, specialty, months }) => {
		// compile payment data
		const paymentData = {
			action: 'pay',
			amount: total,
			currency: 'UAH',
			description: `Оплата за${months.map(month => ` ${month}`)} міс. Учень: ${pupil}, викладач: ${teacher}, предмет: ${specialty}.`,
			order_id: uuidv4(),
			version: '3',
			language: 'uk',
			result_url: process.env.REACT_APP_LIQPAY_RESULT_URL
		}
		// make a payment
		paymentService.form(paymentData)
			.then(({ data, signature }) => {
				setLiqpayData({ ...liqpayData, data, signature })
				paymentFormEl.current.submit()
			})
			.catch(error => {
				const { message } = { ...error.response.data }
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
	}

	// Form data from db?
	const teachersList = ['Wolfgang Amadeus Mozart', 'Elvis Aaron Presley', 'Kurt Donald Cobain', 'Louis Daniel Armstrong']
	const specialtyList = ['Saxophone', 'Piano', 'Guitar', 'Vocals']
	const months = schoolYearMonths('uk-ua')

	// Form schema
	const paymentFormSchema = Yup.object().shape({
		teacher: Yup.string()
			.oneOf(teachersList, 'Виберіть ім\'я викладача')
			.required('Виберіть ім\'я викладача'),
		pupil: Yup.string()
			.min(2, 'Не менш 3 символів')
			.max(45, 'Максимум 45 символів')
			.required('Введіть прізвище учня'),
		specialty: Yup.string()
			.oneOf(specialtyList, 'Виберіть предмет викладача')
			.required('Виберіть предмет викладача'),
		months: Yup.array()
			// .oneOf(months, 'Ви повинні вибрати не менше одного місяця.')
			.required('Ви повинні вибрати не менше одного місяця.')
	})

	// Form itself
	return (
		<Formik
			initialValues={{
				teacher: '',
				pupil: '',
				specialty: '',
				months: []
			}}
			onSubmit={async (values, { setErrors }) => {
				await handlePayment(values, setErrors)
			}}
			validationSchema={paymentFormSchema}
		>
			{({ handleSubmit,
				handleChange,
				handleBlur,
				handleReset,
				values,
				touched,
				errors,
			}) => (
				<Form
					ref={paymentFormEl}
					data-cy="paymentForm"
					noValidate
					onSubmit={handleSubmit}
					onChange={event => processOrderData(event)}
					method="POST"
					action={process.env.REACT_APP_LIQPAY_API_URL}
					acceptCharset="utf-8"
					className="text-left"
				>

					{/* Teacher name input */}
					<Form.Row>
						<Form.Group
							controlId="teacherNameInput"
							as={Col}
						>
							<Form.Label>Викладач</Form.Label>
							<Form.Control as="select"
								name="teacher"
								data-cy="teacherNameInput"
								onChange={handleChange}
								value={values.teacher}
								isValid={touched.teacher && !errors.teacher}
								isInvalid={touched.teacher && !!errors.teacher}
							>
								<option>Виберіть...</option>
								{teachersList.map(teacher =>
									<option value={teacher} key={teacher}>{teacher}</option>
								)}
							</Form.Control>
							<Form.Control.Feedback>
								Ok
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								{errors.teacher}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					{/* Pupil name input */}
					<Form.Row className="d-flex justify-content-center">
						<Form.Group
							controlId="paymentForm.pupilNameInput"
							as={Col}
						>
							<Form.Label>
								Прізвище учня
							</Form.Label>
							<Form.Control
								type="text"
								name="pupil"
								data-cy="pupilNameInput"
								onChange={handleChange}
								value={values.pupil}
								isValid={touched.pupil && !errors.pupil}
								isInvalid={touched.pupil && !!errors.pupil}
							/>
							<Form.Control.Feedback>
								Ok
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								{errors.pupil}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					{/* Specialty input */}
					<Form.Row>
						<Form.Group
							controlId="paymentForm.specialtyInput"
							as={Col}
						>
							<Form.Label>
								Предмет
							</Form.Label>
							<Form.Control as="select"
								name="specialty"
								data-cy="specialtyInput"
								onChange={handleChange}
								value={values.specialty}
								isValid={touched.specialty && !errors.specialty}
								isInvalid={touched.specialty && !!errors.specialty}
							>
								<option>Виберіть...</option>
								{specialtyList.map(specialty =>
									<option value={specialty} key={specialty}>{specialty}</option>
								)}
							</Form.Control>
							<Form.Control.Feedback>
								Ok
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								{errors.specialty}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<FieldArray
							name='months'
							onChange={handleChange}
							onBlur={handleBlur}
							render={arrayHelpers => (
								<Col className="d-flex flex-wrap pt-3">
									{months.map(month => (
										<Col key={month} xs={4} className="my-2 px-1">
											<Form.Check
												inline
												custom
												name="months"
												type="checkbox"
												id={month}
												value={month}
												label={month}
												checked={values.months.includes(month)}
												isValid={touched.months && !errors.months}
												isInvalid={touched.months && !!errors.months}
												onChange={event => {
													if (event.target.checked) arrayHelpers.push(month)
													else {
														const index = values.months.indexOf(month)
														arrayHelpers.remove(index)
													}
												}}
											/>
										</Col>
									))}
									<ErrorMessage
										name="months"
										render={msg => (
											<span className="form-validation-error">
												{msg}
											</span>
										)}
									/>
								</Col>
							)}
						/>
					</Form.Row>

					<Form.Row className="py-3">
						<Col>
							{total
								? <>
									<h5 className="d-inline">
										{`Всього: ${total} `}
									</h5>
									<FontAwesomeIcon icon={faHryvnia} />
								</>
								: <h6 className="text-muted">
										Заповніть форму для розрахунку вартості
								</h6>
							}
						</Col>
					</Form.Row>

					<input type="hidden" name="data" value={liqpayData.data || ''} />
					<input type="hidden" name="signature" value={liqpayData.signature || ''} />
					<input type="hidden" name="language" value="uk" />

					{/* Pay button */}
					<Form.Row className="d-flex justify-content-around py-4">
						<Col>
							<Button
								block
								type="submit"
								variant="primary"
								data-cy="payBtn"
								className="primary-color-shadow"
							>
									Оплатити
							</Button>
						</Col>
						<Col>
							<Button
								block
								type="reset"
								variant="light"
								data-cy="payBtn"
								className=""
								onClick={handleReset}
							>
									Очистити
							</Button>
						</Col>
					</Form.Row>

				</Form>
			)}
		</Formik>
	)
}

export default PaymentForm

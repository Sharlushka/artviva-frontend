import React, { useState, useEffect, useRef } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import paymentService from '../../services/payment'
import { setNotification } from '../../reducers/notificationReducer'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHryvnia } from '@fortawesome/free-solid-svg-icons'

const PaymentForm = () => {

	const [orderData, setOrderData] = useState({
		teacher: null,
		specialty: null,
		months: 1,
		baseCost: 200,
		total: null
	})
	const [total, setTotal] = useState(null)

	// calculate total to show when filling the form
	const processOrderData = ({ target }) => {
		switch (target.name) {
		case 'teacher':
			setOrderData({ ...orderData, teacher: target.value })
			break
		case 'specialty':
			setOrderData({ ...orderData, specialty: target.value })
			break
		case 'months':
			setOrderData({ ...orderData, months: target.value })
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
			setTotal(baseCost * months)
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
			description: `Оплата за ${months} міс. Учень: ${pupil}, викладач: ${teacher}, предмет: ${specialty}.`,
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
	const monthsQuantity = 12

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
		date: Yup.date()
			.min(new Date().toISOString().substr(0,10), 'Дата повинна бути сьогодні або в майбутньому')
			.required('Введіть дату початку навчання'),
		months: Yup.number()
			.max(12, 'Не більше 12 місяців')
			.required()
	})

	// Form itself
	return (
		<Formik
			initialValues={{
				teacher: '',
				pupil: '',
				specialty: '',
				date: new Date().toISOString().substr(0,10),
				months: 1
			}}
			onSubmit={async (values, { resetForm, setErrors }) => {
				await handlePayment(values, setErrors)
				resetForm()
			}}
			validationSchema={paymentFormSchema}
		>
			{({ handleSubmit,
				handleChange,
				handleBlur,
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
								onBlur={handleBlur}
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
								onBlur={handleBlur}
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
								onBlur={handleBlur}
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

					{/* Date input */}
					<Form.Row>
						<Form.Group
							controlId="paymentForm.dateInput"
							as={Col}
						>
							<Form.Label>
								Дата початку навчання
							</Form.Label>

							<Form.Control
								type="date"
								name="date"
								data-cy="dateInput"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.date}
								isValid={touched.date && !errors.date}
								isInvalid={touched.date && !!errors.date}
							/>
							<Form.Control.Feedback>
								Ok
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								{errors.date}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							controlId="paymentForm.monthsInput"
							as={Col}
						>

							{/* Months duration */}
							<Form.Label>
								Скільки місяців?
							</Form.Label>
							<Form.Control as="select"
								name="months"
								data-cy="monthsInput"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.months}
								isValid={touched.months && !errors.months}
								isInvalid={touched.months && !!errors.months}
							>
								{[...Array(monthsQuantity)].map((value, index) =>
									index === 0
										? <option value={index + 1} defaultValue key={index}>{index + 1}</option>
										: <option value={index + 1} key={index}>{index + 1}</option>
								)}
							</Form.Control>
							<Form.Control.Feedback>
								Ok
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								{errors.months}
							</Form.Control.Feedback>

						</Form.Group>
					</Form.Row>
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

					<input type="hidden" name="data" value={liqpayData.data || ''} />
					<input type="hidden" name="signature" value={liqpayData.signature || ''} />
					<input type="hidden" name="language" value="uk" />

					{/* Pay button */}
					<Form.Row className="d-flex justify-content-center">
						<Button
							type="submit"
							block
							variant="primary"
							data-cy="payBtn"
							className="primary-color-shadow my-3 mx-1"
						>
								Оплатити
						</Button>
					</Form.Row>

				</Form>
			)}
		</Formik>
	)
}

export default PaymentForm

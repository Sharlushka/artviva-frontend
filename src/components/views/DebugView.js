import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Form, InputGroup, Button } from 'react-bootstrap'
import paymentService from '../../services/payment'
import { Formik } from 'formik'
import * as Yup from 'yup'

const DebugView = () => {
	const [liqpayData, setLiqpayData] = useState('')
	const [liqpaySignature, setLiqpaySignature] = useState('')
	const [paymentData, setPaymentData] = useState({})

	const sampleData = {
		action: 'pay',
		amount: '1',
		currency: 'UAH',
		description: 'Sample payment: piano',
		order_id: Math.floor(Math.random() * Math.floor(9999999)),
		version: '3'
	}

	useEffect(() => {
		paymentService.form(sampleData) // paymentData
			.then(({ data, signature }) => {
				setLiqpayData(data)
				setLiqpaySignature(signature)
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	return (
		<Form
			data-cy="paymentForm"
			noValidate
			method="POST"
			action="https://www.liqpay.ua/api/3/checkout"
			acceptCharset="utf-8"
			className="mt-5"
		>
			{/* Liqpay data hidden input */}
			<Form.Row>
				<Form.Group controlId="liqpayData" as={Col}>
					<Form.Control
						type="hidden"
						name="data"
						value={liqpayData || ''}
					/>
				</Form.Group>
			</Form.Row>
			{/* Liqpay signature hidden input */}
			<Form.Row>
				<Form.Group controlId="liqpaySignature" as={Col}>
					<Form.Control
						type="hidden"
						name="signature"
						value={liqpaySignature || ''}
					/>
				</Form.Group>
			</Form.Row>
			{/* Liqpay button input */}
			<Form.Row>
				<Form.Group controlId="payButton">
					<Form.Control
						className="p-0"
						type="image"
						src={'//static.liqpay.ua/buttons/p1ru.radius.png'}
					/>
				</Form.Group>
			</Form.Row>

		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(DebugView)

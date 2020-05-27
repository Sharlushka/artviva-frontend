import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { createPupil, updatePupil } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'
import specialtyService from '../../services/specialties'
import { findByPropertyValue } from '../../utils/arrayHelpers'
import { phoneNumber } from '../../utils/stringPatterns'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'
import { trimObject } from '../../utils/objectHelpers'
import moment from 'moment'

import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

import { Container, Col, Form } from 'react-bootstrap'
import BtnWithSpinner from '../common/BtnWithSpinner'
import TextInput from './components/TextInput'
import TextAreaInput from './components/TextAreaInput'
import Select from './components/Select'
import DateInput from './components/DateInput'
import CheckBox from './components/Checkbox'

const PupilForm = ({
	pupil,
	user,
	setNotification,
	createPupil,
	updatePupil,
	mode,
	closeModal }) => {

	const [editMode, setEditMode] = useState(false)
	const [processingForm, setProcessingForm] = useState(false)
	const [specialtiesNames, setSpecialtiesNames] = useState([])
	const [specialtiesData, setSpecialtiesData] = useState([])
	const genders = ['male', 'female']
	const classNumbers = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
	const benefits = [50, 100]

	// set auth token and mode
	useEffect(() => {
		pupilsService.setToken(user.token)
		if (mode === 'edit') {
			setEditMode(true)
		}
	}, [user, mode])

	useEffect(() => {
		specialtyService.getAll()
			.then(data => {
				setSpecialtiesData(data)
				setSpecialtiesNames(data.map(specialty => specialty.title))
			})
			.catch(error => console.error(error))
	}, [])

	// handle edit or create
	const handlePupil = (values, setErrors, resetForm) => {
		// replace human readable specialty with id
		const { id } = findByPropertyValue(values.specialty, 'title', specialtiesData)
		values = { ...values,	specialty: id }
		if (editMode) values = { ...values, schoolClasses: values.schoolClasses.map(item => item.id) }

		setProcessingForm(true)
		editMode
			? existingPupil(trimObject(values), setErrors)
			: newPupil(trimObject(values), setErrors, resetForm)
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
			.finally(() => setProcessingForm(false))
	}

	const existingPupil = (values, setErrors) => {
		updatePupil(pupil.id, values)
			.then(() => {
				setNotification({
					message: 'Зміни успішно збережено.',
					variant: 'success'
				}, 5)
				closeModal()
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
			.finally(() => setProcessingForm(false))
	}

	// form data and schema
	const initialFormValues = () =>
		editMode
			? { ...pupil,
				specialty: pupil.specialty.title,
				dateOfBirth: moment(pupil.dateOfBirth).format('YYYY-MM-DD')
			}
			: { name: '',
				applicantName: '',
				specialty: '',
				dateOfBirth: '',
				mainSchool: '',
				mainSchoolClass: '',
				gender: '',
				hasBenefit: '',
				fathersName: '',
				fathersPhone: '',
				fathersEmploymentInfo: '',
				mothersName: '',
				mothersPhone: '',
				mothersEmploymentInfo: '',
				contactEmail: '',
				homeAddress: '',
				docsCheck: false,
				processDataCheck: false,
				paymentObligationsCheck: false,
				info: ''
			}

	const pupilFormSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повнe ім\'я.'),
		applicantName: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть повнe applicant ім\'я.'),
		specialty: Yup.string()
			.oneOf(specialtiesNames, 'Виберіть фах учня.')
			.required('Select specialty.'),
		dateOfBirth: Yup.date()
			.min(new Date(1950, 0, 1))
			.max(new Date(2019, 0, 1))
			.required('Select date of birth.'),
		mainSchool: Yup.string()
			.min(3, 'Не менш 3 символів.')
			.max(255, 'Максимум 255 символів.')
			.required('Enter main school address.'),
		mainSchoolClass: Yup.number()
			.min(1)
			.max(11)
			.required('Enter current class.'),
		gender: Yup.string()
			.oneOf(genders, 'Select gender')
			.required('Select gender of your child.'),
		hasBenefit: Yup.number()
			.min(0)
			.max(100),
		fathersName: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.'),
		fathersPhone: Yup.string()
			.min(3, 'Не менш 19 символів.')
			.max(19, 'Максимум 19 символів.')
			.matches(phoneNumber, 'Перевірте форматування, має бути: +XX (XXX) XXX-XX-XX')
			.required('Введіть номер телефону.'),
		fathersEmploymentInfo: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.'),
		mothersName: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.'),
		mothersPhone: Yup.string()
			.min(3, 'Не менш 19 символів.')
			.max(19, 'Максимум 19 символів.')
			.matches(phoneNumber, 'Перевірте форматування, має бути: +XX (XXX) XXX-XX-XX')
			.required('Введіть номер телефону.'),
		mothersEmploymentInfo: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.'),
		contactEmail: Yup.string()
			.email('Адреса електронної пошти недійсна.')
			.required('Введіть електронну пошту.'),
		homeAddress: Yup.string()
			.min(2, 'Не менш 2 символів.')
			.max(128, 'Максимум 128 символів.')
			.required('Введіть домашню адресу.'),
		docsCheck: Yup.bool()
			.oneOf([true]),
		processDataCheck: Yup.bool()
			.oneOf([true]),
		paymentObligationsCheck: Yup.bool()
			.oneOf([true]),
		info: Yup.string()
			.min(3, 'Не менш 3 символів.')
			.max(255, 'Максимум 255 символів.')
	})

	return (
		<Container>
			<Formik
				initialValues={initialFormValues()}
				enableReinitialize
				onSubmit={(values, { resetForm, setErrors }) => {
					handlePupil(values, setErrors, resetForm)
				}}
				validationSchema={pupilFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					setFieldValue,
					values,
					touched,
					errors
				}) => (
					<Form
						data-cy="pupil-form"
						noValidate
						onSubmit={handleSubmit}
					>
						<p className="pt-2 mb-1 text-muted text-center">
							Дані/інформація про учня
						</p>
						<Form.Row>
							<TextInput
								label="Повне ім'я учня"
								name="name"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								touched={touched.name}
								errors={errors.name}
							/>
						</Form.Row>

						<Form.Row>
							<Select
								label="Фах"
								name="specialty"
								options={specialtiesNames}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.specialty}
								touched={touched.specialty}
								errors={errors.specialty}
							/>
						</Form.Row>

						<Form.Row>
							<Select
								label="Пол"
								name="gender"
								options={genders}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.gender}
								touched={touched.gender}
								errors={errors.gender}
							/>

							<DateInput
								label="Birth date"
								name="dateOfBirth"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.dateOfBirth}
								touched={touched.dateOfBirth}
								errors={errors.dateOfBirth}
							/>
						</Form.Row>

						<Form.Row>
							<Select
								label="Поточний клас"
								name="mainSchoolClass"
								options={classNumbers}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.mainSchoolClass}
								touched={touched.mainSchoolClass}
								errors={errors.mainSchoolClass}
							/>

							<Select
								label="Пільги %"
								name="hasBenefit"
								options={benefits}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.hasBenefit}
								touched={touched.hasBenefit}
								errors={errors.hasBenefit}
							/>

							<TextInput
								label="В якому закладі навчается"
								name="mainSchool"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.mainSchool}
								touched={touched.mainSchool}
								errors={errors.mainSchool}
							/>

							<TextInput
								label="Домашня адреса"
								name="homeAddress"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.homeAddress}
								touched={touched.homeAddress}
								errors={errors.homeAddress}
							/>

							<TextInput
								label="Ім'я особи, яка звертається із заявою"
								name="applicantName"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.applicantName}
								touched={touched.applicantName}
								errors={errors.applicantName}
							/>

							<TextInput
								label="Контактна електронна пошта"
								name="contactEmail"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.contactEmail}
								touched={touched.contactEmail}
								errors={errors.contactEmail}
							/>
						</Form.Row>

						<p className="pt-2 mb-1 text-muted text-center">
							Дані/інформація о батьках
						</p>

						<Form.Row>
							<TextInput
								label="Ім'я батька"
								name="fathersName"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.fathersName}
								touched={touched.fathersName}
								errors={errors.fathersName}
							/>

							<TextInput
								label="Телефонний номер батька"
								name="fathersPhone"
								onChange={handleChange}
								onKeyUp={event => formatPhoneNumber(event, 'fathersPhone', setFieldValue)}
								onBlur={handleBlur}
								value={values.fathersPhone}
								touched={touched.fathersPhone}
								errors={errors.fathersPhone}
							/>

							<TextInput
								label="Місце роботи батька"
								name="fathersEmploymentInfo"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.fathersEmploymentInfo}
								touched={touched.fathersEmploymentInfo}
								errors={errors.fathersEmploymentInfo}
							/>

							<TextInput
								label="Ім'я матері"
								name="mothersName"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.mothersName}
								touched={touched.mothersName}
								errors={errors.mothersName}
							/>

							<TextInput
								label="Телефонний номер матері"
								name="mothersPhone"
								onChange={handleChange}
								onKeyUp={event => formatPhoneNumber(event, 'mothersPhone', setFieldValue)}
								onBlur={handleBlur}
								value={values.mothersPhone}
								touched={touched.mothersPhone}
								errors={errors.mothersPhone}
							/>

							<TextInput
								label="Місце роботи матері"
								name="mothersEmploymentInfo"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.mothersEmploymentInfo}
								touched={touched.mothersEmploymentInfo}
								errors={errors.mothersEmploymentInfo}
							/>
						</Form.Row>

						{editMode
							? <TextAreaInput
								label="Додаткова інформація/опис"
								rows={2}
								name="info"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.info}
								touched={touched.info}
								errors={errors.info}
							/>
							: <Form.Row>
								<Col xs={12}>
									<p className="pt-2">До договору додаються:</p>
									<ol style={{ paddingLeft: '1rem' }}>
										<li>
											Копія свідоцтва про народження
										</li>
										<li>
											Медічна довідка про відсутність противопоказань до занять обраним фахом.
										</li>
									</ol>
								</Col>
								<Col xs={12} className="pb-2">
									<CheckBox
										type="checkbox"
										id="docs-checkbox"
										label="Я зобов'язаний надати ці документи шкільному відділу"
										name="docsCheck"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.docsCheck}
										touched={touched.docsCheck}
										errors={errors.docsCheck}
									/>
								</Col>
								<Col xs={12} className="py-2">
									<CheckBox
										type="checkbox"
										id="personal-data-checkbox"
										label="Я згоден на збір та обробку моїх персональних даних"
										name="processDataCheck"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.processDataCheck}
										touched={touched.processDataCheck}
										errors={errors.processDataCheck}
									/>
								</Col>
								<Col xs={12} className="py-2">
									<CheckBox
										type="checkbox"
										id="payment-checkbox"
										label="Зобов'язання про оплату"
										name="paymentObligationsCheck"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.paymentObligationsCheck}
										touched={touched.paymentObligationsCheck}
										errors={errors.paymentObligationsCheck}
									/>
								</Col>
							</Form.Row>
						}

						{/* Button */}
						<Form.Row className="d-flex justify-content-center text-center">
							<Form.Group
								as={Col}
								className="pt-4"
							>
								<BtnWithSpinner
									loadingState={processingForm}
									className="px-4"
									variant={editMode ? 'success' : 'primary'}
									type="submit"
									label={editMode ? 'Зберегти' : 'Додати'}
									dataCy="add-pupil-btn"
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
	mode: PropTypes.oneOf(['create', 'edit']).isRequired,
	closeModal: PropTypes.func
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

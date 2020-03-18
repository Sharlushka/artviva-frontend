import React, { useEffect, useRef, useImperativeHandle } from 'react'
import { ReCaptcha } from 'react-recaptcha-google'
import recaptchaService from '../../services/recaptcha'
import PropTypes from 'prop-types'

const ReCaptchaComp = React.forwardRef(({ setScore, size, render, badge, hl }, ref) => {

	useEffect(() => {
		onLoadRecaptcha()
	},[])

	const recaptchaRef = useRef()

	const verifyCallback = async recaptchaToken => {
		const { result } = await recaptchaService.verify(recaptchaToken)
		setScore(result.score)
	}

	const onLoadRecaptcha = () => {
		if (recaptchaRef.current) {
			recaptchaRef.current.reset()
			recaptchaRef.current.execute()
		}
	}

	useImperativeHandle(ref, () => {
		return {
			verifyCallback,
			onLoadRecaptcha
		}
	})

	ReCaptchaComp.displayName = 'ReCaptchaComp'

	return (
		<ReCaptcha
			ref={recaptchaRef}
			size={size}
			render={render}
			sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
			badge={badge}
			hl={hl}
			onloadCallback={onLoadRecaptcha}
			verifyCallback={verifyCallback}
		/>
	)
})

ReCaptchaComp.propTypes = {
	setScore: PropTypes.func.isRequired,
	size: PropTypes.string.isRequired,
	render: PropTypes.string.isRequired,
	badge: PropTypes.string.isRequired,
	hl: PropTypes.string.isRequired
}

export default ReCaptchaComp

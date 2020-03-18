import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Container, Spinner } from 'react-bootstrap'
import { setNotification } from '../../reducers/notificationReducer'
import { activateAccount } from '../../reducers/accountReducer'

const ActivateAccountView = ({ account, match, activateAccount, setNotification }) => {

	const payload = {
		uuid: match.params.uuid
	}

	const sendActivationData = useCallback(async payload => {
		await activateAccount(payload)
			.then(() => {
				setNotification({
					message: 'Ваш обліковий запис активовано, ви можете увійти.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				setNotification({
					message: `Нам не вдалося активувати ваш рахунок: ${error.message}`,
					variant: 'danger'
				}, 5)
			})
	}, [activateAccount, setNotification])

	useEffect(() => {
		sendActivationData(payload)
	// eslint-disable-next-line
	},[])

	return (
		<Container className="pt-4 mt-4 text-center">
			<h1 className="custom-font py-4">
				Активація облікового запису...
			</h1>
			{account
				? <h5>
						Ваш обліковий запис активовано, ви можете увійти.
				</h5>
				: <Spinner animation="border" variant="primary" />
			}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		account: state.account
	}
}

const mapDispatchToProps = {
	activateAccount,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivateAccountView)


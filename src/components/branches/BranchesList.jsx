import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeBranches } from '../../reducers/branchesReducer'
import { ListGroup } from 'react-bootstrap'
import Branch from '../branches/Branch'

const BranchesList = ({ user, initializeBranches, branches }) => {

	useEffect(() => {
		initializeBranches()
	// eslint-disable-next-line
	}, [])

	if (branches) {
		return (
			<>
				<h4>Всі філії</h4>
				<ListGroup>
					{branches.map(branch =>
						<ListGroup.Item
							key={branch.id}
						>
							<Branch branch={branch} />
						</ListGroup.Item>
					)}
				</ListGroup>
			</>
		)
	} else {
		return (
			<h4>Loading...</h4>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		branches: state.branches
	}
}

const mapDispatchToProps = {
	setNotification,
	initializeBranches
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BranchesList)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeBranches } from '../../reducers/branchesReducer'
import { ListGroup } from 'react-bootstrap'
import Branch from './Branch'

const BranchesList = ({ initializeBranches, branches }) => {

	useEffect(() => {
		initializeBranches()
	// eslint-disable-next-line
	}, [])

	return (
		<>
			<h5 className="py-2">Філії</h5>
			{branches
				? <ListGroup>
					{branches.map(branch =>
						<ListGroup.Item
							className="px-0 py-1"
							key={branch.id}
						>
							<Branch branch={branch} />
						</ListGroup.Item>
					)}
				</ListGroup>
				: <h4>Завантаження...</h4>
			}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
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

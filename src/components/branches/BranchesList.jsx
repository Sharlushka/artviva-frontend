import React, { useEffect, useState, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeBranches } from '../../reducers/branchesReducer'

import { Container, ListGroup } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'
import Toggler from '../common/Toggler'
import Branch from './Branch'

const LazyBranchForm = React.lazy(() => import('../forms/BranchForm'))

const BranchesList = ({ initializeBranches, branches }) => {

	const branchFormRef = useRef(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		initializeBranches()
			.catch(error => {
				setNotification({
					message: `Щось пішло не так, спробуйте пізніше:
						${error.status} ${error.statusText}`,
					variant: 'danger'
				}, 5)
			})
			.finally(() => setIsLoading(false))
	// eslint-disable-next-line
	}, [])

	return (
		<Container className="mt-5 text-center">
			<h4 className="pt-4 custom-font">Філії</h4>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					<ListGroup>
						{branches.map(branch =>
							<ListGroup.Item
								className="px-0 py-1"
								key={branch.id}
							>
								<Branch branch={branch} />
							</ListGroup.Item>
						)}
					</ListGroup>
					<Toggler
						buttonLabel="Додати нову філію"
						data-cy="add-new-branch-btn"
						ref={branchFormRef}
					>
						<Suspense fallback={<div>Loading...</div>}>
							<LazyBranchForm mode='create' />
						</Suspense>
					</Toggler>
				</>
			}
		</Container>
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

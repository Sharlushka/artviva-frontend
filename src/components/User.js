import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ userData }) => {
	return (
		<div>
			<span>
				<Link to={`/users/${userData.id}`}>
					{ userData.username }
				</Link>&nbsp;
			</span>
			<span>
				{userData.blogs.length}
			</span>
		</div>
	)
}

export default User

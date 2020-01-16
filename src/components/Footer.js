import React from 'react'
import { footerDate } from '../services/dateAndTime'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<span className="text-muted">&copy;&nbsp;{footerDate()}&nbsp;Artviva</span>
			</div>
		</footer>
	)
}

export default Footer

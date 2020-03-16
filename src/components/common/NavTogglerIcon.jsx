import React from 'react'
import { ReactComponent as MenuIcon } from '../../svg/menu.svg'
import { ReactComponent as CloseIcon } from '../../svg/close.svg'
import PropTypes from 'prop-types'

const NavTogglerIcon = ({ type }) => {
	return (
		<>
			{type
				? <CloseIcon className="animated fadeIn"/>
				: <MenuIcon className="animated fadeIn" />
			}
		</>
	)
}

NavTogglerIcon.propTypes = {
	type: PropTypes.bool.isRequired
}

export default NavTogglerIcon

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import NavBarLink from '../common/NavBarLink'
import NavTogglerIcon from '../common/NavTogglerIcon'
import Logout from '../common/Logout'

const NavigationBar = ({ user }) => {

	// navbar visibility and hiding on scroll
	const [visibility, setVisibility] = useState(true)
	const [prevScrollpos, setScrollPosition] = useState(window.pageYOffset)

	const handleScroll = useCallback(() => {
		const currentScrollPos = window.pageYOffset
		const visible = prevScrollpos > currentScrollPos

		setVisibility(visible)
		setScrollPosition(currentScrollPos)
	}, [prevScrollpos])

	useEffect(() => {
		document.addEventListener('scroll', handleScroll)
		return () => document.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	// closing on click outside
	const navBarRef = useRef(null)
	const [isExpanded, setExpanded] = useState(false)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside, false)
		return () => document.removeEventListener('mousedown', handleClickOutside, false)
	},[])

	const toggleExpanded = () => {
		setExpanded(!isExpanded)
	}

	const handleClickOutside = event => {
		if (navBarRef.current.contains(event.target)) {
			return
		}
		setExpanded(false)
	}

	// list of links
	const linkClassList = 'pr-2 py-2 py-sm-0 px-md-2 d-flex align-items-center'
	const navLinks = [
		{
			to: '/teachers',
			label: 'Вчителі',
			className: linkClassList
		},
		{
			to: '/showcase',
			label: 'На сцені',
			className: linkClassList
		},
		{
			to: '/about',
			label: 'Історія',
			className: linkClassList
		},
		{
			to: '/blog',
			label: 'Блог',
			className: linkClassList
		},
		{
			to: '/pay/form',
			label: 'Оплата',
			className: linkClassList
		},
		{
			to: '/contacts',
			label: 'Контакти',
			className: linkClassList
		}
	]

	return (
		<header>
			<Navbar
				ref={navBarRef}
				fixed="top"
				collapseOnSelect
				onToggle={toggleExpanded}
				expanded={isExpanded}
				expand="sm"
				bg="light"
				variant="light"
				className={visibility ? 'navbar-visible' : 'navbar-hidden' }
			>
				<Navbar.Brand href="/" className="d-flex align-items-center py-0">
					<Image
						alt="Лого"
						src="/img/schoolLogo-transparent.png"
						width="30"
						height="30"
					/>{' '}
					<span className="pl-2 nav-logo-font">ArtViva</span>
				</Navbar.Brand>
				<Navbar.Toggle
					// children={<NavTogglerIcon />}
					aria-controls="responsive-navbar-nav"
				>
					<NavTogglerIcon type={isExpanded}/>
				</Navbar.Toggle>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<NavDropdown title="Школа" id="school-mgmt-links">
							{user
								? <>
									<NavDropdown.Item href="/school/overview">Огляд</NavDropdown.Item>
									{/*<NavDropdown.Item href="/school/classes">Класи</NavDropdown.Item>
									<NavDropdown.Item href="/school/teachers">Вчителі</NavDropdown.Item>
									<NavDropdown.Item href="/school/pupils">Учні</NavDropdown.Item>
									<NavDropdown.Item href="/school/specialties">Спеціальності</NavDropdown.Item>
									<NavDropdown.Item href="/school/branches">Філії</NavDropdown.Item>*/}
									<NavDropdown.Item href="/school/payments">Платежі</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/school/payments"><Logout /></NavDropdown.Item>
								</>
								: <>
									<NavDropdown.Item href="/login">Логін</NavDropdown.Item>
									<NavDropdown.Item href="/register">Реєстрація</NavDropdown.Item>
								</>
							}
						</NavDropdown>
						{navLinks.map(link =>
							<NavBarLink
								key={link.to}
								to={link.to}
								className={link.className}
								href={link.to}
								label={link.label}
								onClick={toggleExpanded}
							/>
						)}
						{/*<UserInfoPopover />*/}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(NavigationBar)

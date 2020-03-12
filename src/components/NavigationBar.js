import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Nav, Image } from 'react-bootstrap'
import UserInfoPopover from '../components/common/UserInfoPopover'

const NavigationBar = ({ user }) => {

	const [visibility, setVisibility] = useState(true)
	const [prevScrollpos, setScrollPosition] = useState(window.pageYOffset)

	const handleScroll = useCallback(() => {
		const currentScrollPos = window.pageYOffset
		const visible = prevScrollpos > currentScrollPos

		setVisibility(visible)
		setScrollPosition(currentScrollPos)
	}, [prevScrollpos])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	return (
		<header>
			<Navbar fixed="top" collapseOnSelect expand="sm" bg="light" variant="light"
				className={visibility ? 'navbar-visible' : 'navbar-hidden' }
			>
				<Navbar.Brand href="/" className="d-flex align-items-center">
					<Image
						alt="Лого"
						src="img/schoolLogo-transparent.png"
						width="30"
						height="30"
					/>{' '}
					<span className="pl-2 nav-logo-font">ArtViva</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto pl-2 d-flex align-items-left">

						<Link to="/about" className="d-flex align-items-center">
							<Nav.Link as="span" href="/about" activeclassname="active">
								Історія
							</Nav.Link>
						</Link>

						{/*
						<Link to="/debug" className="d-flex align-items-center">
							<Nav.Link href="#" as="span">
								Debug
							</Nav.Link>
						</Link>*/}

						<Link to="/teachers" className="d-flex align-items-center">
							<Nav.Link as="span" href="/teachers" activeclassname="active">
								Наші вчителі
							</Nav.Link>
						</Link>

						<Link to="/blog" className="d-flex align-items-center">
							<Nav.Link as="span" href="/blog" activeclassname="active">
								Блог
							</Nav.Link>
						</Link>

						<Link to="/contacts" className="d-flex align-items-center">
							<Nav.Link as="span" href="/contacts" activeclassname="active">
								Контакти
							</Nav.Link>
						</Link>

						<UserInfoPopover />

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

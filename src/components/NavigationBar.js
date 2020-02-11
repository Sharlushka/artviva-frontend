import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from './Logout'
import { Navbar, Nav, Image } from 'react-bootstrap'

const NavigationBar = ({ user }) => {
	return (
		<header>
			<Navbar collapseOnSelect expand="sm" bg="light" variant="light">
				<Navbar.Brand href="/" className="d-flex align-items-center">
					<Image
						alt="Лого"
						src="img/schoolLogo-transparent.png"
						width="30"
						height="30"
					/>{' '}
					<span className="pl-2 nav-logo-font">Artviva</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto pl-2 d-flex align-items-left">

						<Link to="/about" className="d-flex align-items-center">
							<Nav.Link as="span" href="/about" activeclassname="active">
								Про школу
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

						<Nav.Link
							className="d-flex justify-content-end"
							href="/login"
							as="span"
							activeclassname="active"
						>
							{user
								? <>
									<em className="d-flex align-items-center">
										{user.username} logged in
									</em>
									<Logout />
								</>
								: <Link to="/login">Логін</Link>
							}
						</Nav.Link>

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

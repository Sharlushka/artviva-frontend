import React from 'react'
import { footerDate } from '../services/dateAndTime'
import { Container, Row, Col } from 'react-bootstrap'

import { ReactComponent as FbIcon } from '../svg/facebook.svg'
import { ReactComponent as InstIcon } from '../svg/instagram.svg'

const Footer = () => {
	const maxWidth = {
		maxWidth: '1.7em',
		margin: '0em .5em'
	}

	const border = {
		border: '1px solid pink'
	}
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col xs={7} className="d-flex align-items-center">
						<span className="text-muted copy-info">
							<strong>
								&copy;&nbsp;{footerDate()}&nbsp;Artviva
							</strong>
							<br />
							<small>
								Іконки зроблені <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
									Freepik</a> з <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com
								</a>
							</small>
						</span>
					</Col>
					<Col xs={5} className="icons-column text-center px-0">
						<a
							href="https://www.facebook.com/myz.shpytky"
							alt="Фейсбук-група Шпитьківської Дитячої Школи Мистецтв"
						>
							<FbIcon style={maxWidth} />
						</a>
						<a
							href="https://www.instagram.com/myz_shputky"
							alt="Інстаграм Шпитьківської Дитячої Школи Мистецтв"
						>
							<InstIcon style={maxWidth} />
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer

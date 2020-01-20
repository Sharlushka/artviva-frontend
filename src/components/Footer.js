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
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col xs={8}>
						<span className="text-muted">
							&copy;&nbsp;{footerDate()}&nbsp;Artviva
						</span>
					</Col>
					<Col xs={4} className="text-center">
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

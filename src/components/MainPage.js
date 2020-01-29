import React from 'react'
import { connect } from 'react-redux'
// import LargeImg from './common/LargeImg'
import Carousel from './common/MainViewCarousel'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { ReactComponent as OrigamiIcon } from '../svg/origami.svg'
import { ReactComponent as EditIcon } from '../svg/edit.svg'
import { ReactComponent as LoveSongIcon } from '../svg/love-song.svg'

const MainPage = () => {
	const respStyle = {
		height:'auto',
		width:'100%'
	}

	/*
	const borderPink = {
		border: '1px solid pink'
	}*/

	return (
		<>
			<Carousel />
			<Container>
				<Row className="py-4">
					<Col
						xs={4}
						className="d-flex justify-content-center align-items-center"
					>
						<Image src="img/schoolLogo-transparent.png" style={respStyle}/>
					</Col>
					<Col
						xs={8}
						className="d-flex justify-content-center align-items-center"
					>
						<strong className="main-title custom-font">
							Artviva — дитяча школа мистецтв.
						</strong>
					</Col>
					<Col>
						<Row className="text-center py-4 justify-content-center">
							<Col xs={12} sm={6} className="py-4">
								<OrigamiIcon />
								<p className="pt-4 px-2 main-page-descr">
									Сьогодні Шпитьківська ДШМ на чолі з Іванчук Оленою Анатоліївною
									&mdash; сучасний заклад естетичного виховання, де на музичному,
									хореографічному та художньому відділеннях 80 досвідчених, дипломованих
									викладачів та концертмейстерів навчають майже 1000 дітей.
								</p>
							</Col>
							<Col xs={12} sm={6} className="py-4">
								<EditIcon />
								<p className="pt-4 px-2 main-page-descr">
									Адміністрація школи прикладає максимум зусиль для покращення
									і осучаснення матеріальної бази, впровадження новітніх технологій
									та підняття якості навчання на новий рівень.
								</p>
							</Col>
							<Col xs={12} sm={8} className="py-4">
								<LoveSongIcon />
								<p className="pt-4 px-2 main-page-descr">
									Головним завданням навчально-виховного процесу ШДШМ є створення умов
									для творчого, інтелектуального, духовного і фізичного самовираження
									особистості, пошук, розвиток та підтримка обдарованих і талановитих
									дітей. Все це ми робимо з любов&apos;ю, щирістю та відкритою душею.
								</p>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(MainPage)

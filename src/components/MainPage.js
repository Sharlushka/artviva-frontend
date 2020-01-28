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

	const borderPink = {
		border: '1px solid pink'
	}

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
					<Col
						xs={12}
					>
						<p className="pt-4 main-page-descr">
							Сьогодні Шпитьківська ДШМ на чолі з Іванчук Оленою Анатоліївною
							&mdash; сучасний заклад естетичного виховання, де на музичному,
							хореографічному та художньому відділеннях 80 досвідчених, дипломованих
							викладачів та концертмейстерів навчають майже 1000 дітей.
						</p>
						<p className="main-page-descr">
							Адміністрація школи прикладає максимум зусиль для покращення
							і осучаснення матеріальної бази, впровадження новітніх технологій
							та підняття якості навчання на новий рівень.
						</p>
						<p className="main-page-descr">
							Головним завданням навчально-виховного процесу ШДШМ є створення умов
							для творчого, інтелектуального, духовного і фізичного самовираження
							особистості, пошук, розвиток та підтримка обдарованих і талановитих
							дітей. Все це ми робимо з любов&apos;ю, щирістю та відкритою душею.
						</p>
					</Col>
					<Col>
						<Container>
							<Row className="text-center py-4">
								<Col xs={12}>
									<OrigamiIcon />
									<p className="py-4 alternate-font">Never Apologize for Being an Artist</p>
								</Col>
								<Col xs={12}>
									<EditIcon />
									<p className="py-4 alternate-font">Your Education. Your Way</p>
								</Col>
								<Col xs={12}>
									<LoveSongIcon />
									<p className="py-4 alternate-font">Art is Where Work Meets Love</p>
								</Col>
							</Row>
						</Container>
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

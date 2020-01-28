import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

const BlogView = () => {
	return (
		<Container>
			<h1 className="py-3 text-center custom-font">Блог</h1>
			<Row>
				<Col>
					<div className="fb-page d-flex justify-content-center"
						data-href="https://www.facebook.com/myz.shpytky"
						data-tabs="timeline"
						data-width="500"
						data-height="550"
						data-small-header="true"
						data-adapt-container-width="true"
						data-hide-cover="true"
						data-show-facepile="false">
						<blockquote
							cite="https://www.facebook.com/myz.shpytky"
							className="fb-xfbml-parse-ignore">
							<a href="https://www.facebook.com/myz.shpytky">
								Шпитьківська Дитяча Школа Мистецтв
							</a>
						</blockquote>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(BlogView)

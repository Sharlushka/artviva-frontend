import React from 'react'
import { Carousel } from 'react-bootstrap'

const MainViewCarousel = () => {
	return (
		<Carousel>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="img/carousel/arts-n-crafts.jpg"
					alt="First slide"
				/>
				<Carousel.Caption>
					<h3>Навчання</h3>
					<br />
					<p>Безліч напрямків навчання: образотворче мистецтво, музика, театр</p>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img
					className="d-block w-100"
					src="img/carousel/paper-boats.jpg"
					alt="Third slide"
				/>
				<Carousel.Caption>
					<h3>Вчителі</h3>
					<br />
					<p>Наші вчителі найдосвідченіші! )</p>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img
					className="d-block w-100"
					src="img/carousel/commerce.jpg"
					alt="Third slide"
				/>
				<Carousel.Caption>
					<h3>Співбесіда</h3>
					<br />
					<p>Ви можете записатися на співбесіду у нас на сайті</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	)
}

export default MainViewCarousel

import React from 'react'
import { connect } from 'react-redux'
import { Container, Image } from 'react-bootstrap'
import { ParallaxBanner } from 'react-scroll-parallax'


const DebugView = () => {
	/*
	const respStyle = {
		height:'auto',
		width:'100%',
	}

	const bkg = {
		background: 'white',
		border: '1px solid red',
		color: 'red'
	}

	const height = {
		height: '10rem',
		border: '1px solid green'
	}
	const borderPink = {
		border: '1px solid pink'
	}

	const borderGreen = {
		border: '1px solid green'
	}

	const borderBlue = {
		border: '1px solid blue'
	}*/

	return (
		<>
			<Container>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nulla aliquet enim tortor at auctor urna nunc id cursus. Volutpat maecenas volutpat blandit aliquam. Nec feugiat in fermentum posuere urna. Mi tempus imperdiet nulla malesuada. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Vitae aliquet nec ullamcorper sit amet. Molestie ac feugiat sed lectus. Habitant morbi tristique senectus et. Quis risus sed vulputate odio ut enim. Viverra maecenas accumsan lacus vel facilisis volutpat est. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
					Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Laoreet suspendisse interdum consectetur libero id. Dolor purus non enim praesent elementum facilisis leo. Venenatis lectus magna fringilla urna. Vitae purus faucibus ornare suspendisse sed nisi lacus. Enim lobortis scelerisque fermentum dui faucibus. Erat nam at lectus urna duis convallis convallis tellus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Bibendum enim facilisis gravida neque convallis a cras. Praesent tristique magna sit amet purus gravida quis. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Euismod nisi porta lorem mollis aliquam. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Risus ultricies tristique nulla aliquet enim tortor at auctor. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. In aliquam sem fringilla ut morbi tincidunt augue. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Maecenas accumsan lacus vel facilisis. Sed cras ornare arcu dui vivamus arcu. Maecenas volutpat blandit aliquam etiam erat velit scelerisque.
					Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Ultrices gravida dictum fusce ut placerat. Diam vel quam elementum pulvinar. Nisi porta lorem mollis aliquam ut porttitor. Etiam non quam lacus suspendisse. Sem viverra aliquet eget sit amet tellus cras. Odio ut enim blandit volutpat maecenas. Fames ac turpis egestas sed tempus. Tellus in metus vulputate eu scelerisque felis imperdiet proin. Elit duis tristique sollicitudin nibh sit amet commodo. Venenatis cras sed felis eget velit aliquet. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Consequat ac felis donec et odio pellentesque diam. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Nisi lacus sed viverra tellus in hac. Aliquet enim tortor at auctor urna nunc id cursus.
				</p>
			</Container>
			<ParallaxBanner
				className="your-class"
				layers={[
					{
						image: 'img/parallax/book.jpg',
						amount: 0.2,
					},
				]}
				style={{
					height: '20rem',
				}}
			>
			</ParallaxBanner>
			<Container>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nulla aliquet enim tortor at auctor urna nunc id cursus. Volutpat maecenas volutpat blandit aliquam. Nec feugiat in fermentum posuere urna. Mi tempus imperdiet nulla malesuada. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Vitae aliquet nec ullamcorper sit amet. Molestie ac feugiat sed lectus. Habitant morbi tristique senectus et. Quis risus sed vulputate odio ut enim. Viverra maecenas accumsan lacus vel facilisis volutpat est. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
					Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Laoreet suspendisse interdum consectetur libero id. Dolor purus non enim praesent elementum facilisis leo. Venenatis lectus magna fringilla urna. Vitae purus faucibus ornare suspendisse sed nisi lacus. Enim lobortis scelerisque fermentum dui faucibus. Erat nam at lectus urna duis convallis convallis tellus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Bibendum enim facilisis gravida neque convallis a cras. Praesent tristique magna sit amet purus gravida quis. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Euismod nisi porta lorem mollis aliquam. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Risus ultricies tristique nulla aliquet enim tortor at auctor. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. In aliquam sem fringilla ut morbi tincidunt augue. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Maecenas accumsan lacus vel facilisis. Sed cras ornare arcu dui vivamus arcu. Maecenas volutpat blandit aliquam etiam erat velit scelerisque.
					Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Ultrices gravida dictum fusce ut placerat. Diam vel quam elementum pulvinar. Nisi porta lorem mollis aliquam ut porttitor. Etiam non quam lacus suspendisse. Sem viverra aliquet eget sit amet tellus cras. Odio ut enim blandit volutpat maecenas. Fames ac turpis egestas sed tempus. Tellus in metus vulputate eu scelerisque felis imperdiet proin. Elit duis tristique sollicitudin nibh sit amet commodo. Venenatis cras sed felis eget velit aliquet. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Consequat ac felis donec et odio pellentesque diam. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Nisi lacus sed viverra tellus in hac. Aliquet enim tortor at auctor urna nunc id cursus.
				</p>
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
)(DebugView)

/*
		{/*<Container className="p-0">
			<h1 className="custom-font py-3 m-0">Debug</h1>
			<p style={bkg}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nulla aliquet enim tortor at auctor urna nunc id cursus. Volutpat maecenas volutpat blandit aliquam. Nec feugiat in fermentum posuere urna. Mi tempus imperdiet nulla malesuada. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Vitae aliquet nec ullamcorper sit amet. Molestie ac feugiat sed lectus. Habitant morbi tristique senectus et. Quis risus sed vulputate odio ut enim. Viverra maecenas accumsan lacus vel facilisis volutpat est. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
				Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Laoreet suspendisse interdum consectetur libero id. Dolor purus non enim praesent elementum facilisis leo. Venenatis lectus magna fringilla urna. Vitae purus faucibus ornare suspendisse sed nisi lacus. Enim lobortis scelerisque fermentum dui faucibus. Erat nam at lectus urna duis convallis convallis tellus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Bibendum enim facilisis gravida neque convallis a cras. Praesent tristique magna sit amet purus gravida quis. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Euismod nisi porta lorem mollis aliquam. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Risus ultricies tristique nulla aliquet enim tortor at auctor. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. In aliquam sem fringilla ut morbi tincidunt augue. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Maecenas accumsan lacus vel facilisis. Sed cras ornare arcu dui vivamus arcu. Maecenas volutpat blandit aliquam etiam erat velit scelerisque.
				Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Ultrices gravida dictum fusce ut placerat. Diam vel quam elementum pulvinar. Nisi porta lorem mollis aliquam ut porttitor. Etiam non quam lacus suspendisse. Sem viverra aliquet eget sit amet tellus cras. Odio ut enim blandit volutpat maecenas. Fames ac turpis egestas sed tempus. Tellus in metus vulputate eu scelerisque felis imperdiet proin. Elit duis tristique sollicitudin nibh sit amet commodo. Venenatis cras sed felis eget velit aliquet. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Consequat ac felis donec et odio pellentesque diam. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Nisi lacus sed viverra tellus in hac. Aliquet enim tortor at auctor urna nunc id cursus.
			</p>
			<Parallax styleInner={height} className="custom-class" y={[-50, 20]} tagOuter="figure">
				<Image src="img/parallax/book.jpg" style={respStyle} />
			</Parallax>
			<p style={bkg}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nulla aliquet enim tortor at auctor urna nunc id cursus. Volutpat maecenas volutpat blandit aliquam. Nec feugiat in fermentum posuere urna. Mi tempus imperdiet nulla malesuada. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Vitae aliquet nec ullamcorper sit amet. Molestie ac feugiat sed lectus. Habitant morbi tristique senectus et. Quis risus sed vulputate odio ut enim. Viverra maecenas accumsan lacus vel facilisis volutpat est. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
				Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Laoreet suspendisse interdum consectetur libero id. Dolor purus non enim praesent elementum facilisis leo. Venenatis lectus magna fringilla urna. Vitae purus faucibus ornare suspendisse sed nisi lacus. Enim lobortis scelerisque fermentum dui faucibus. Erat nam at lectus urna duis convallis convallis tellus. Amet consectetur adipiscing elit ut aliquam purus sit amet. Bibendum enim facilisis gravida neque convallis a cras. Praesent tristique magna sit amet purus gravida quis. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Euismod nisi porta lorem mollis aliquam. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Risus ultricies tristique nulla aliquet enim tortor at auctor. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. In aliquam sem fringilla ut morbi tincidunt augue. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Maecenas accumsan lacus vel facilisis. Sed cras ornare arcu dui vivamus arcu. Maecenas volutpat blandit aliquam etiam erat velit scelerisque.
				Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Ultrices gravida dictum fusce ut placerat. Diam vel quam elementum pulvinar. Nisi porta lorem mollis aliquam ut porttitor. Etiam non quam lacus suspendisse. Sem viverra aliquet eget sit amet tellus cras. Odio ut enim blandit volutpat maecenas. Fames ac turpis egestas sed tempus. Tellus in metus vulputate eu scelerisque felis imperdiet proin. Elit duis tristique sollicitudin nibh sit amet commodo. Venenatis cras sed felis eget velit aliquet. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Consequat ac felis donec et odio pellentesque diam. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Nisi lacus sed viverra tellus in hac. Aliquet enim tortor at auctor urna nunc id cursus.
			</p>
	</Container>*/
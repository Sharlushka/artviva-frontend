import React from 'react'
import PropTypes from 'prop-types'

const YoutubeVideo = ({ title, src }) => {
	return (
		<div className="video-responsive mb-5 gray-shadow">
			<iframe
				title={title}
				width="789"
				height="444"
				src={src}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			>
			</iframe>
		</div>
	)
}

YoutubeVideo.propTypes = {
	title: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
}

export default YoutubeVideo

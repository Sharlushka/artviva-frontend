import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'

const placeHolder =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXQQAAa4BD0ZXfxUAAAAASUVORK5CYII='

const LazyLoadedImage = ({ src, alt, classList }) => {
	const [imageSrc, setImageSrc] = useState(placeHolder)
	const [imageRef, setImageRef] = useState()

	const onLoad = event => {
		event.target.classList.add('loaded')
	}

	const onError = event => {
		event.target.classList.add('has-error')
	}

	useEffect(() => {
		let observer
		let didCancel = false

		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (
								!didCancel &&
								(entry.intersectionRatio > 0 || entry.isIntersecting)
							) {
								setImageSrc(src)
								observer.unobserve(imageRef)
							}
						})
					},
					{
						threshold: 0.5,
						rootMargin: '75%'
					}
				)
				observer.observe(imageRef)
			} else {
				// Old browsers fallback
				setImageSrc(src)
			}
		}
		return () => {
			didCancel = true
			// on component cleanup, we remove the listner
			if (observer && observer.unobserve) {
				observer.unobserve(imageRef)
			}
		}
	}, [src, imageSrc, imageRef])

	return (
		<Image
			className={`lazy-loading-image ${classList}`}
			rounded
			ref={setImageRef}
			src={imageSrc}
			alt={alt}
			onLoad={onLoad}
			onError={onError}
		/>
	)
}

export default LazyLoadedImage

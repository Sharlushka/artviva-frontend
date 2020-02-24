export default function throttle (subject, wait) {
	let time = Date.now()
	return () => {
		if ((time + wait - Date.now()) < 0) {
			subject()
			time = Date.now()
		}
	}
}

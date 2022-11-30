export const roundDistance = (distance: number) => {
	let unit = ''
	let rounded = 0
	if (distance < 100) {
		rounded = Math.round(distance / 10) * 10
		unit = 'm'
	} else if (distance < 1000) {
		rounded = Math.round(distance / 100) * 100
		unit = 'm'
		if (rounded === 1000) {
			rounded = 1
			unit = 'km'
		}
	} else {
		rounded = Math.round(distance / 1000)
		unit = 'km'
	}

	return `${rounded} ${unit}`
}

export const kThousand = (value: number): string =>
	value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)

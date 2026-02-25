export function kebabToTitleCase(value: string) {
	const words = value.split("-");

	const titleCase = words.map(word => {
		return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).trim()
	})

	return titleCase.join(' ')
}

export function snakeToTitleCase(value: string) {
	const words = value.split("_");

	const titleCase = words.map(word => {
		return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).trim()
	})

	return titleCase.join(' ')
}

const camelToTitleCase = (value: string) => {
	const spacedString = value.replace(/([A-Z])/g, (match) => ` ${match}`);

	const titleCaseString = spacedString.replace(/^./, (match) => match.toUpperCase()).trim();

	return titleCaseString;
}

const sentenceToTitleCase = (value: string) => {
	const words = value.split(" ");

	const titleCase = words.map(word => {
		return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).trim()
	})

	return titleCase.join(' ')
}

/**
 * Converts a programmic name to title case. Supports kebab-case, snake_case, and camelCase
 * This means it will strip -, _, and upperCase
 */
export function codeToTitleCase(value: string) {
	let s = kebabToTitleCase(value)
	s = snakeToTitleCase(s)
	s = camelToTitleCase(s)
	s = sentenceToTitleCase(s)
	return s
}

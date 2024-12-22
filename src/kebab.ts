export function toKebabCase(str: string): string {
	return str
		.replace(/^[A-Z]/, (uppercaseLetter) => uppercaseLetter.toLowerCase())
		.replace(
			/[A-Z]/g,
			(uppercaseLetter) => `-${uppercaseLetter.toLowerCase()}`,
		);
}

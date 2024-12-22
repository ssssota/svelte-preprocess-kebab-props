import MagicString, { type SourceMap } from "magic-string";
import { toKebabCase } from "./kebab.js";

export function processScript(source: string): {
	code: string;
	map: SourceMap;
} {
	const s = new MagicString(source);
	const re =
		/(let[ \t]+{)(.+?)}(:[ \t]*(.*?))?[ \t]*=[ \t]*\$props[ \t]*[ \t]*\([ \t]*\)/;
	const match = re.exec(source);
	if (match) {
		const start = match.index;
		const props = match[2]
			.split(",")
			.map((prop) => prop.trim())
			.filter(Boolean);
		const newProps = props.map(toKebabProp).join(",");
		s.overwrite(
			start + match[1].length,
			start + match[1].length + match[2].length,
			newProps,
		);
	}
	return { code: s.toString(), map: s.generateMap() };
}

function toKebabProp(propCandidate: string): string {
	if (propCandidate.startsWith("...")) {
		// rest props ({...rest})
		return propCandidate;
	}
	if (propCandidate.includes(":")) {
		// already renamed ({prop:alias})
		const [propName, alias] = propCandidate.split(":");
		const kebabName = toKebabCase(propName);
		if (propName === kebabName) {
			return propCandidate;
		}
		return `"${kebabName}":${alias}`;
	}
	// single prop ({prop})
	const [prop, defaultValue] = propCandidate.split(/[ \t]*=[ \t]*/);
	const kebabName = toKebabCase(prop);
	if (prop === kebabName) {
		return propCandidate;
	}
	return `"${kebabName}":${prop}${defaultValue ? `=${defaultValue}` : ""}`;
}

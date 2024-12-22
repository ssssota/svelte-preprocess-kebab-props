import { expect, it } from "vitest";
import { toKebabCase } from "./kebab.js";

it("should convert camelCase to kebab-case", () => {
	const actual = toKebabCase("fooBarBaz");
	expect(actual).toBe("foo-bar-baz");
});

it("should handle leading uppercase letters", () => {
	const actual = toKebabCase("FooBarBaz");
	expect(actual).toBe("foo-bar-baz");
});

it("should handle single uppercase letters", () => {
	const actual = toKebabCase("fooBarBazAAA");
	expect(actual).toBe("foo-bar-baz-a-a-a");
});

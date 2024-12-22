import { expect, it } from "vitest";
import { processScript } from "./process.js";

it("should not transform if no props", () => {
	const { code } = processScript("");
	expect(code).toBe("");
});

it("should transform single camelCase prop", () => {
	const { code } = processScript("let { fooBar } = $props()");
	expect(code).toBe('let {"foo-bar":fooBar} = $props()');
});

it("should transform multiple camelCase props", () => {
	const { code } = processScript("let { fooBar, barBaz } = $props()");
	expect(code).toBe('let {"foo-bar":fooBar,"bar-baz":barBaz} = $props()');
});

it("should transform camelCase prop with alias", () => {
	const { code } = processScript("let { fooBar:baz } = $props()");
	expect(code).toBe('let {"foo-bar":baz} = $props()');
});

it("should transform camelCase prop with alias and rest props", () => {
	const { code } = processScript("let { fooBar:baz, ...rest } = $props()");
	expect(code).toBe('let {"foo-bar":baz,...rest} = $props()');
});

it("should not transform if already kebab-case", () => {
	const { code } = processScript('let {"foo-bar":baz} = $props();');
	expect(code).toBe('let {"foo-bar":baz} = $props();');
});

it("should not transform default value", () => {
	const { code } = processScript("let { fooBar = 42 } = $props()");
	expect(code).toBe('let {"foo-bar":fooBar=42} = $props()');
});

it("should transform with alias and default value", () => {
	const { code } = processScript("let { fooBar:baz = 42 } = $props()");
	expect(code).toBe('let {"foo-bar":baz = 42} = $props()');
});

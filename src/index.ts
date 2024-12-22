import type { PreprocessorGroup, Processed } from "svelte/compiler";
import { processScript } from "./process.js";

export function kebabProps(): PreprocessorGroup {
	return {
		name: "kebab-props",
		script(ctx): Processed {
			return processScript(ctx.content);
		},
	};
}
export default kebabProps;

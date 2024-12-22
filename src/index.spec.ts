import { preprocess } from "svelte/compiler";
import { expect, it } from "vitest";
import { kebabProps } from "./index.js";

it("should convert camelCase props to kebab-case", async () => {
	const actual = await preprocess(
		`<script lang="ts">
type Props = {
  fooProp: string;
  barProp: number;
};
let {fooProp, barProp, ...restProps}: Props = $props();
</script>

<p>{fooProp} {barProp}</p>`,
		[kebabProps()],
	);
	expect(actual.code).toMatchInlineSnapshot(
		`
    "<script lang="ts">
    type Props = {
      fooProp: string;
      barProp: number;
    };
    let {"foo-prop":fooProp,"bar-prop":barProp,...restProps}: Props = $props();
    </script>

    <p>{fooProp} {barProp}</p>"`,
	);
});

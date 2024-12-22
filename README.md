# svelte-preprocess-kebab-props (WIP)

This is a preprocessor for svelte preprocess. It converts camelCase props to kebab-case props.

## Usage

Then add it to your svelte preprocess options:

```js
// svelte.config.js
import { kebabProps } from 'svelte-preprocess-kebab-props';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [kebabProps()],
};
export default config;
```

## Example

_source_

```svelte
<script lang="ts">
  type Props = {
    fooProp: string;
    barProp: number;
  };
  let {fooProp, barProp, ...restProps}: Props = $props();
</script>

<p>{fooProp} {barProp}</p>
```

_transformed_ (Types are not transformed)

```svelte
<script lang="ts">
  type Props = {
    fooProp: string;
    barProp: number;
  };
  let {"foo-prop":fooProp,"bar-prop":barProp,...restProps}: Props = $props();
</script>

<p>{fooProp} {barProp}</p>
```

## License

MIT

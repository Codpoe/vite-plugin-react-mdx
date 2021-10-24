# vite-plugin-react-mdx
vite plugin for react and mdx

## Install
   
```shell
pnpm add vite-plugin-react-mdx @mdx-js/react
```

## Usage
Add the plugin to your `vite.config.ts`
```ts
import { defineConfig } from 'vite';
import reactMdx from 'vite-plugin-react-mdx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactMdx({
      // See https://mdxjs.com/advanced/plugins
      remarkPlugins: [
        // E.g. `remark-frontmatter`
      ],
      rehypePlugins: [],
    })
  ],
});
```

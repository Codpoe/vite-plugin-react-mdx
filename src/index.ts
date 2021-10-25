import type { Plugin } from 'vite';
import { createCompiler } from '@mdx-js/mdx';

export interface ReactMdxOptions {
  remarkPlugins?: any[];
  rehypePlugins?: any[];
}

export function reactMdx(options: ReactMdxOptions = {}): Plugin {
  const compiler = createCompiler(options);

  // TODO: upgrade to mdx v2
  const compileMdx = async (code: string, id: string) => {
    const { contents } = await compiler.process({
      contents: code,
      path: id,
    });

    return `/* @jsxRuntime classic */
/* @jsx mdx */
import * as React from 'react';
import { mdx } from '@mdx-js/react';
${contents}`;
  };

  let viteReactPlugin: Plugin | undefined;

  return {
    name: 'vite-plugin-react-mdx',
    enforce: 'pre',
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        item => item.name === 'vite:react-babel'
      );
    },
    async transform(code, id, ssr) {
      if (/\.mdx?/.test(id)) {
        code = await compileMdx(code, id);

        return (
          viteReactPlugin?.transform?.call(this, code, id + '.jsx', ssr) || code
        );
      }
    },
  };
}

export default reactMdx;

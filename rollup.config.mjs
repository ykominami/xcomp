import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        exports: 'auto'
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        exports: 'auto'
      }
    ],
    plugins: [
      commonjs({include: ['node_modules/**']}),
      typescript({ tsconfig: './tsconfig.json'}),
      postcss({
        plugins: [
          autoprefixer()
        ],
        sourceMap: true,
        minimize: true,
      }),
      terser()
    ],
    external: ['react']
  },
  {
    input: 'dist/cjs/types/index.d.ts',
    output: [{ file: 'dist/cjs/index.d.ts', format: 'cjs'}],
    plugins: [dts()],
    external: [/\.css$/u]
  }
]

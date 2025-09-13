import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/pattern-drawer.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      nodeResolve()
    ]
  },
  
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/pattern-drawer.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      nodeResolve()
    ]
  },
  
  // UMD build for browsers
  {
    input: 'src/index.js',
    output: {
      file: 'dist/pattern-drawer.umd.js',
      format: 'umd',
      name: 'PatternDrawer',
      sourcemap: true,
      globals: {}
    },
    plugins: [
      nodeResolve()
    ]
  },
  
  // Minified UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/pattern-drawer.umd.min.js',
      format: 'umd',
      name: 'PatternDrawer',
      sourcemap: true,
      globals: {}
    },
    plugins: [
      nodeResolve(),
      terser({
        format: {
          comments: false
        }
      })
    ]
  }
];
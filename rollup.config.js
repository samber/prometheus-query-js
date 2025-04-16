import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with {type: "json"};;

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * github.com/samber/prometheus-query-js
 * (c) ${new Date().getFullYear()} prometheus-query-js Contributors
 * Released under the MIT License
 */`;

export default [
    // browser-friendly UMD build
    // https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/
    {
        input: 'src/index.ts',
        output:  [
            {
                exports: 'named',
                name: 'Prometheus',
                file: pkg.browser,
                format: 'umd',
                banner,
                sourcemap: true,
            },
        ],
        external: [],
        plugins: [
            json(),
            // so Rollup can find `axios`
            resolve({
                browser: true
            }),
            typescript({
                useTsconfigDeclarationDir: true,
                tsconfigOverride: { compilerOptions : { module: 'es2015' } }
            }),
            // so Rollup can convert `axios` to an ES module
            commonjs({
                extensions: ['.js', '.ts']
            }),
            terser(),
        ],
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/index.ts',
        external: [],
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            }
        ],
        plugins: [
            typescript({
                tsconfigOverride: { compilerOptions : { module: "es2015" } },
            }),
        ],
    }
];

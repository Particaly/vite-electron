import { join, resolve } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import renderer from 'vite-plugin-electron-renderer'
import pkg from '../../package.json'

const extra = ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {})]

export default defineConfig({
	root: __dirname,
	envDir: resolve(__dirname, '../'),
	resolve: {
		alias: {
			'@@': resolve(__dirname, '../'),
		},
	},
	plugins: [
		renderer({
			resolve() {
				return extra
			},
		}),
	],
	build: {
		outDir: '../../dist/preload',
		emptyOutDir: true,
		minify: process.env./* from mode option */ NODE_ENV === 'production',
		// https://github.com/caoxiemeihao/electron-vue-vite/issues/61
		sourcemap: 'inline',
		rollupOptions: {
			input: {
				// multiple entry
				index: join(__dirname, 'index.ts'),
			},
			output: {
				format: 'cjs',
				entryFileNames: '[name].cjs',
				manualChunks: {},
			},
			external: extra,
		},
	},
})

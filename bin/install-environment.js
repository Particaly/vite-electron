/**
 * @author J.S.Patrick
 * @description set-install-environment
 * @date 2021/9/17 10:56
 */
const path = require('path')
const child_process = require('child_process')

function exec(program, param, options = { shell: true, stdio: 'inherit' }) {
	return new Promise(resolve => {
		const process = child_process.spawn(program, param, options)
		process.on('exit', resolve)
	})
}

async function main() {
	await exec('npm', ['install yarn -g'])
		.then(() =>
			exec('yarn', [
				'config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"',
			])
		)
		.then(() => exec('yarn', ['config set phantomjs_cdnurl "http://cnpmjs.org/downloads"']))
		.then(() =>
			exec('yarn', ['config set electron_mirror "https://npm.taobao.org/mirrors/electron/"'])
		)
		.then(() =>
			exec('yarn', [
				'config set sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"',
			])
		)
		.then(() =>
			exec('yarn', [
				'config set profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"',
			])
		)
		.then(() =>
			exec('yarn', [
				'config set chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"',
			])
		)

	child_process.spawn('yarn', [], {
		cwd: path.resolve(__dirname, '../'),
		shell: true,
		stdio: 'inherit',
	})
}

main()

/* global module */
/* tslint:disable */

const path = require('path');
const sauceLaunchers = require('./sauceLaunchers');

module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: path.join(__dirname, '..'),
		frameworks: [
			'chai',
			'mocha',
		],
		files: [
			'./node_modules/babel-polyfill/dist/polyfill.js',
			'./node_modules/sinon/pkg/sinon.js',
			'./src/**/__tests__/**/*.ts',
			'./src/**/__tests__/**/*.tsx',
			'./src/**/__tests__/**/*.js',
			'./src/**/__tests__/**/*.jsx'
		],
		
		browsers: [
			'Chrome'
		],
		reporters: [
			'progress'
		],
		
		preprocessors: {
			'./src/**/__tests__/**/*': ['webpack']
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /\.tsx?$/,
						loaders: ['babel-loader', 'ts-loader'],
						exclude: /node_modules/,
					}, {
						test: /\.jsx?$/,
						loader: 'babel-loader',
						exclude: /node_modules/,
					},
				],
			},
			resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
		webpackMiddleware: {
			noInfo: true,
		},

		browserDisconnectTimeout: 10000,
		browserDisconnectTolerance: 2,
		captureTimeout: 2 * 60 * 10000,
		browserNoActivityTimeout: 2 * 60 * 1000,
		autoWatch: false,
		singleRun: true
	});

	const {
		CI,
		TRAVIS,
		TRAVIS_BRANCH,
		TRAVIS_BUILD_NUMBER,
		TRAVIS_JOB_NUMBER,
		TRAVIS_PULL_REQUEST,
	} = process.env;

	if (TRAVIS) {
		const travisLaunchers = {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		};
		config.set({
			customLaunchers: travisLaunchers,
			reporters: [
				'failed',
			],
			browsers: [
				'Firefox',
				'Chrome_travis_ci'
			],
		});
	}

	console.log(CI, TRAVIS_PULL_REQUEST, TRAVIS_BRANCH, ['master', 'dev', 'sauce-labs'].indexOf(TRAVIS_BRANCH) > -1)
	if (CI && !TRAVIS_PULL_REQUEST && ['master', 'dev', 'sauce-labs'].indexOf(TRAVIS_BRANCH) > -1) {
		config.set({
			sauceLabs: {
				testName: 'Inferno Browser Karma Tests: ' + TRAVIS_JOB_NUMBER,
				build: (TRAVIS_JOB_NUMBER || 'Local'),
				public: true
			},
			concurrency: 2,
			customLaunchers: sauceLaunchers,
			browsers: Object.keys(sauceLaunchers),
			reporters: [
				'failed',
				'saucelabs'
			]
		})
	}
};

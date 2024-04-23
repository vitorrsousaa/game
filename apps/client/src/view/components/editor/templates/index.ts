export const templates = [
	{
		name: 'First',
		content: [
			`import 'isomorphic-fetch';`,
			`import chalk from 'chalk';`,
			'',
			`console.log(chalk.green("Hello World"));`,
			`function logTesting() {
  console.log('Testing');
      }`,
			`logTesting();`
		].join('\n')
	}
];

export const templates = [
	{
		name: "First",
		content: [
			// `import 'isomorphic-fetch';`,
			`import chalk from 'chalk';`,
			"",
			`export function double(number) {
		return number * 2;
}`,
			"const result = double(3);",
			"console.log(chalk.green(result));",
		].join("\n"),
		test: [
			`import { spy } from '@vitest/spy';`,
			`import { double } from './index';`,
			"",
			`
			describe('double', () => {
				it('should be double' , () =>{
					const result = double(3);
					expect(result).toBe(6);
				})
			})
			;`,
		].join("\n"),
	},
];

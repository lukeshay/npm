import { HttpMethods, Router, StatusCodes, router } from "../src";

describe("index", () => {
	const exports = [HttpMethods, Router, StatusCodes, router];

	exports.forEach((exp) => {
		test(`should export`, () => {
			expect(exp).toBeDefined();
		});
	});
});

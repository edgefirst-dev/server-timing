import { expect, mock, test } from "bun:test";

import { TimingCollector } from ".";

const fn = mock().mockImplementation(async () => {
	await new Promise((resolve) => setTimeout(resolve, 5));
});

test("simulated scenario", async () => {
	let collector = new TimingCollector();

	await loader(collector);

	let headers = new Headers();
	collector.toHeaders(headers);

	expect(headers.get("Server-Timing")).toBeString();
});

async function loader(timer: TimingCollector) {
	await timer.measure("loader-fn-1", fn);
	await timer.measure("loader-fn-2", fn);
	await Promise.all([
		timer.measure("loader-fn-3", fn),
		timer.measure("loader-fn-4", fn),
	]);
}

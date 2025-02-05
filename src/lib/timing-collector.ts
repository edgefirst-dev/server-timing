import { Timing } from "./timing.js";

export class TimingCollector {
	collection = new Set<Timing>();

	/**
	 * Add a Timing instance to the collection.
	 * @param timing The Timing instance to collect.
	 */
	collect(timing: Timing) {
		this.collection.add(timing);
	}

	/**
	 * Measure the duration of a function.
	 * @param name The name of the measurement.
	 * @param description The description of the measurement. Optional.
	 * @param fn The function to measure.
	 */
	measure<T>(
		name: string,
		description: string,
		fn: Timing.MeasureFunction<T>,
	): Promise<T>;
	measure<T>(name: string, fn: Timing.MeasureFunction<T>): Promise<T>;
	measure<T>(
		name: string,
		descriptionOrFn: string | Timing.MeasureFunction<T>,
		fn?: Timing.MeasureFunction<T>,
	) {
		let callback = typeof descriptionOrFn === "string" ? fn : descriptionOrFn;
		if (!callback) throw new Error("Callback function is required");

		let timing = new Timing(
			name,
			typeof descriptionOrFn === "string" ? descriptionOrFn : undefined,
		);

		return timing.measure(callback).finally(() => void this.collect(timing));
	}

	/**
	 * Convert the measurements to a string.
	 * @returns The string representation of the measurements.
	 */
	toString() {
		return Array.from(this.collection)
			.map((m) => m.toString())
			.join(", ");
	}

	/**
	 * Append a Server-Timing header per measurement to the given Headers object.
	 * @param headers The Headers object to append to.
	 * @returns The Headers object with the Server-Timing headers appended.
	 */
	toHeaders(headers = new Headers()) {
		return headers.set("Server-Timing", this.toString());
	}
}

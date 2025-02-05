export class Timing implements PerformanceServerTiming {
	start = 0;
	end = 0;

	constructor(
		public name: string,
		public description = "",
	) {}

	get duration() {
		if (this.end === 0) return 0;
		let result = this.end - this.start;
		if (result < 0) return 0;
		return result;
	}

	async measure<T>(fn: Timing.MeasureFunction<T>): Promise<T> {
		this.start = performance.now();
		try {
			return await fn();
		} finally {
			this.end = performance.now();
		}
	}

	toString() {
		let value = [this.name];
		if (this.description) value.push(`desc="${this.description}"`);
		if (this.duration > 0) value.push(`dur=${this.duration.toFixed(2)}`);
		return value.join(";");
	}

	toJSON() {
		return {
			name: this.name,
			description: this.description,
			duration: this.duration,
		};
	}
}

export namespace Timing {
	export type MeasureFunction<T> = () => Promise<T>;
}

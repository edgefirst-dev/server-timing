# @edgefirst-dev/server-timing

A helper to collect measurements for the Server-Timing header

## Usage

Install the package:

```bash
bun add @edgefirst-dev/server-timing
```

Instantiate the timing collector:

```ts
import { TimingCollector } from "@edgefirst-dev/server-timing";

// You can instantiate this in the getLoadContext of Remix or React Router
let collector = new TimingCollector();
```

Take measurements:

```ts
collector.measure("my-metrict", "optional description", 100, async () => {
  // do something
});
```

Get the Server-Timing header:

```ts
let headers = new Headers();
collector.toHeaders(headers);
```

> [!TIP]
> Use this library in Remix or React Router applications to measure async code like HTTP requests or database queries, then collect the measurements and add them to the Server-Timing header.

### Manually collect timings

You can also manually collect timings:

```ts
import { Timing } from "@edgefirst-dev/server-timing";

// measures are taken from the time this is created
let timing = new Timing("name", "description");

await doSomething(); // do something

timing.end(); // end the measurement
collector.add(timing); // add the timing to the collector
```

Each `Timing` can be used once. If you want to take different measurements, create a new `Timing` instance.

> [!TIP]
> Use the `Collector#measure` method to automatically create a `Timing` instance and add it to the collector.

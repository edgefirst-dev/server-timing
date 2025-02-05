# @edgefirst-dev/server-timing

A helper to collect measurements for the Server-Timing header

## Usage

Install the package:

```bash
bun add @edgefirst-dev/server-timing
```

Instantiate the collector:

```ts
import { Collector } from "@edgefirst-dev/server-timing";

// You can instantiate this in the getLoadContext of Remix or React Router
let collector = new Collector();
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
import { ServerTiming } from "@edgefirst-dev/server-timing";

let timing = new ServerTiming("name", "description");

timing.measure(async () => {
  // do something
});

collector.add(timing);
```

Each `ServerTiming` can be used once. If you want to take different measurements, create a new `ServerTiming` instance.

> [!TIP]
> Use the `Collector#measure` method to automatically create a `ServerTiming` instance and add it to the collector.

# Cummunicate

The easy as piss way to talk to Cumcord from your website.

For example:
```js
// Find the port numbers of all available Cumcord instances.
const ports = (await cummunicate("get_info")).map(p => p[0]);
```

## Installation

### Bundler

`npm i @cumcord/cummunicate`

```js
import cummunicate from "@cumcord/cummunicate";

cummunicate()
```

### Browser (ES Modules)

```html

<script type="module">
	import cummunicate from "https://cdn.esm.sh/@cumcord/cummunicate";

	cummunicate()
</script>
```

### Browser (Traditional)

```html

<script src="https://cdn.esm.sh/@cumcord/cummunicate/dist/browser.js"/>
<script>
	cummunicate()
</script>
```

## Usage

The `cummunicate` function takes one or two args:

- `action: string` - The action to invoke on all available clients
- `payload?: object` - Any data to attach to the WS initiator message

It returns a promise of an array.
Each array elem is a tuple of the following:

- `[0]: number` - The port of the client this reply is from
- `[1]: WsReply` - The reply obtained from the client

Cummunicate will try to talk to any Cumcord instance that will connect.
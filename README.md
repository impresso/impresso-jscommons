# Impresso Common Code

`JavaScript` code shared between [Middle Layer](https://github.com/impresso/impresso-middle-layer) and [Front End](https://github.com/impresso/impresso-frontend). Mostly Protocol Buffers at the moment.

# Building

## Protocol Buffers

When a Procol Buffer schema is changed, corresponding `js` files need to be regenerated. This requires a `protoc` compiler installed. Follow [these instructions](http://google.github.io/proto-lens/installing-protoc.html) to install it on OSX.

Regenerating `js` files from `proto` schemas:

```shell
npm run compile
```

## Cross platform compilation

Since the library is used by both `Middle Layer` (node.js) and `Front End` (browser) the library needs to be compiled to be used in browser. We use [rollup](https://rollupjs.org/) for this.

Compile the library:

```shell
npm run build
```

The library should be compiled before every commit because it is used as a direct GitHub dependency in other projects.

# Testing

Make sure `mocha` is installed.

```shell
npm test
```

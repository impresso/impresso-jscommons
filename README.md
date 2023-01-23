# Impresso Common Code

`JavaScript` code shared between [Middle Layer](https://github.com/impresso/impresso-middle-layer) and [Front End](https://github.com/impresso/impresso-frontend). Mostly Protocol Buffers at the moment.

# Building

## Requirements: Protocol Buffers

When a Protocol Buffer schema is changed - e.g. you change the file [query.proto](https://github.com/impresso/impresso-jscommons/blob/master/proto/query.proto), corresponding `js` files need to be regenerated. This requires a `protoc` compiler installed. Follow [these instructions](http://google.github.io/proto-lens/installing-protoc.html) to install it on OSX.  If you have brew, do `brew install protobuf@3` to install `protoc`.

Note: As of July 2022, there is a known bug in protoc versions 21.1 and 21.2 (and libprotoc 3.21.1 and libprotoc 3.21.2), the brew protoc@3 would install the correct version. See [stackoverflow](https://stackoverflow.com/questions/72572040/protoc-gen-js-program-not-found-or-is-not-executable) thread.

Regenerating `js` files from `proto` schemas:

```shell
npm run compile
```

## Cross platform compilation

Since the library is used by both `Middle Layer` (node.js) and `Front End` (browser) the library needs to be compiled to be used in both browser and Node.js environment. We use [rollup](https://rollupjs.org/) for this.

Compile the library:

```shell
npm run build
```

The library **must be built** before **every commit** because it is used as a direct GitHub dependency in other projects.

# Testing

Make sure `mocha` is installed.

```shell
npm test
```

## Project
The 'impresso - Media Monitoring of the Past' project is funded by the Swiss National Science Foundation (SNSF) under  grant number [CRSII5_173719](http://p3.snf.ch/project-173719) (Sinergia program). The project aims at developing tools to process and explore large-scale collections of historical newspapers, and at studying the impact of this new tooling on historical research practices. More information at https://impresso-project.ch.
## License
Copyright (C) 2020  The *impresso* team. Contributors to this program include: [Roman Kalyakin](https://github.com/theorm), [Daniele Guido](https://github.com/danieleguido).
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. 
This program is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose. See the [GNU Affero General Public License](https://github.com/impresso/impresso-jscommons/blob/master/LICENSE) for more details.

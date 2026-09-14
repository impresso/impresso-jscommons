# Copilot instructions for impresso-jscommons

This library is Protocol-Buffers-backed code shared between the Middle Layer and Front End of the impresso project. It is consumed by other projects as a direct GitHub dependency, so `dist/` must always reflect the current `src/`.

## Adding or changing a Filter type

When adding a new filter type (e.g. `PageNumber`) or changing the `FilterType`/`FilterContext`/`FilterOperator`/`FilterPrecision` enums, follow these steps in order:

1. Edit [proto/query.proto](../proto/query.proto). Follow the existing `TYPE_*` naming convention and add a `// type:...` comment describing the expected shape of `q` (e.g. `string`, `number`, `number list`, `boolean`).
2. Run `npm run compile` to regenerate the generated protobuf code in `src/generated/proto`. This does NOT update `dist/`.
3. Run `npm run build` to rebuild `dist/` (JS bundles and `.d.ts` files) from the updated `src/`. `constants.ts` derives `Types`/`Contexts`/`Operators`/`Precision` automatically from the generated enums, so no manual list needs updating.
4. Add a test in [test/protobuf/index.test.ts](../test/protobuf/index.test.ts) covering serialization/deserialization of the new filter (base64 round-trip), and update [test/util/constants.test.ts](../test/util/case.test.ts) if relevant.
5. Note: the `q` field on `Filter` is always `repeated string` on the wire, even for filters documented as `number`/`number list`/`boolean` — those comments are semantic hints for consumers, not actual proto types.

## Before every commit

Run `npm run build` — the built `dist/` output is used directly by dependent projects and must stay in sync with `src/`.

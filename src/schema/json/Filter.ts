import constants from '../../util/constants'

export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Filter",
  description: "Filter object",
  type: "object",
  required: ["type"],
  properties: {
    q: {
      oneOf: [
        {
          type: "array",
          items: { type: "string" },
        },
        {
          type: "string",
        },
      ],
      description: "Query string or array of strings",
    },
    type: {
      type: "string",
      description: "The filter type",
      enum: constants.filter.Types,
    },
    context: {
      type: "string",
      description:
        "The filter context (without CONTEXT_ prefix and in camelCase)",
      enum: constants.filter.Contexts,
    },
    precision: {
      type: "string",
      description:
        "The filter precision (without PRECISION_ prefix and in camelCase)",
      enum: constants.filter.Precision,
    },
    op: {
      type: "string",
      description: "The filter operator (without OP_ prefix and in uppercase)",
      enum: constants.filter.Operators,
    },
    uids: {
      type: "array",
      items: { type: "string" },
      description: "Array of unique identifiers",
    }
  },
};

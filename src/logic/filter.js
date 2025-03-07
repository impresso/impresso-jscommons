// @ts-check

/**
 * @typedef {import('..').Filter} Filter
 */

/**
 * @param {Filter} p
 * @returns {string}
 */
const getFilterMergeKey = ({
  type, op = 'OR', context = 'inclusive', precision = 'exact',
}) => `t:${type}-o:${op}-c:${context}-p:${precision}`;

/**
 * @param {object} object
 * @param {function} fn
 * @returns {object}
 */
const omitBy = (object, fn) => Object.keys(object).reduce((acc, key) => {
  const value = object[key];
  if (!fn(value)) acc[key] = value;
  return acc;
}, {});

/**
 * Optimize filters by merging filters of the same type with the same
 * context/precision where possible.
 * @param {Filter[]} filters
 * @returns {Filter[]}
 */
export function optimizeFilters(filters) {
  const groupingMap = filters.reduce((map, filter) => {
    const key = getFilterMergeKey(filter);
    const items = map.get(key) || [];
    map.set(key, items.concat([filter]));
    return map;
  }, new Map());
  return [...groupingMap.entries()]
    .map(([, groupedFilters]) => {
      const {
        type, context, precision, op,
      } = groupedFilters[0];
      const query = groupedFilters
        .flatMap(({ q }) => (Array.isArray(q) ? q : [q]))
        .filter((value) => value != null);

      return omitBy({
        type,
        context,
        precision,
        op,
        q: query.length > 1 ? query : query[0],
      }, (value) => value == null);
    });
}

/**
 * Merge filters with a rule that all single item (`q`) filters operator
 * is set to `AND`. Then the standard merge is applied.
 * @param {Filter[][]} filtersSets
 * @returns {Filter[]}
 */
export function mergeFilters(filtersSets) {
  return optimizeFilters(filtersSets.flat().map((filter) => {
    const op = (Array.isArray(filter.q) && filter.q.length === 1) || !Array.isArray(filter.q)
      ? 'AND'
      : filter.op;
    return {
      ...filter,
      op,
    };
  }));
}

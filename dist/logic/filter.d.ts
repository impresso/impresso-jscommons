import { Filter } from "../types/filter";
/**
 * Optimize filters by merging filters of the same type with the same
 * context/precision where possible.
 */
export declare function optimizeFilters(filters: Filter[]): Filter[];
/**
 * Merge filters with a rule that all single item (`q`) filters operator
 * is set to `AND`. Then the standard merge is applied.
 */
export declare function mergeFilters(filtersSets: Filter[][]): Filter[];

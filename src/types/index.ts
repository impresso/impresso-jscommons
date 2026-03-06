import { Filter, FilterType } from './filter'

export { Filter, FilterType }

export interface SearchQuery<G = string> {
  filters: Filter[]
  groupBy?: G
}

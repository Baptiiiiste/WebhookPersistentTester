export type Paginated<T> = {
  items: T[]
  total: number
  index: number
  size: number
}

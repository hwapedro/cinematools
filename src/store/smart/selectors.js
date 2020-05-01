export const getItems = (state, root) => state[root].items
export const getItem = (state, root) => state[root].item
export const getHasMore = (state, root) => state[root].hasMore
export const getTotal = (state, root) => state[root].total
export const getLoading = (state, root) => state[root].loading
export const getError = (state, root) => state[root].error
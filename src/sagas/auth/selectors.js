const root = (state) => state.auth

export const getLoading = state => root(state).loading
export const getIsLogin = state => root(state).isLogin
export const getError = state => root(state).error
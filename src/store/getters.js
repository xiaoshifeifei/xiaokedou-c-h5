const getters = {
    token: state => state.user.token,
    refreshToken: state => state.user.refreshToken,
    tokenType: state => state.user.tokenType,
    userInfo: state => state.user.userInfo
}
export default getters
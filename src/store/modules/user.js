import { login, logout, getInfo } from '@/api/user'
import { getTOkens, getUserStatus, removeUserStatus, removeOpenid, setUserStatus, getTokenType, getOpenid, setOpenid, getToken, setToken, removeToken, setTokenType, removeTokenType, getRefreshToken, setRefreshToken, removeRefreshToken, setUid, getUid, removeUid } from '@/utils/auth'
// import { resetRouter } from '@/router'

const state = {
    // token: getToken(),
    // token:'',
    token: getTOkens(),
    openid: getOpenid(),
    userStatus: getUserStatus(),
    refreshToken: getRefreshToken(), // 刷新token替换的值
    uid: getUid(),
    tokenType: getTokenType(), // token类型
    userInfo: null
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_OPENID: (state, openid) => {
        state.openid = openid
    },
    SET_USERSTATUS: (state, status) => {
        state.userStatus = status
    },
    SET_UID: (state, uid) => {
        state.uid = uid
    },
    SET_TOKENTYPE: (state, type) => {
        state.tokenType = type
    },
    SET_REFRESHTOKEN: (state, refreshtoken) => {
        state.refreshToken = refreshtoken
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const actions = {
    // user login
    // login({ commit }, userInfo) {
    //   const { AdminName, AdminPassword } = userInfo
    //   return new Promise((resolve, reject) => {
    //     login({ AdminName: AdminName.trim(), AdminPassword: AdminPassword.trim(), OpenId: getOpenid() }).then(response => {
    //       const { data } = response
    //       commit('SET_TOKEN', data.token)
    //       commit('SET_USERSTATUS', data.status)
    //       commit('SET_REFRESHTOKEN', data.refresh_token)
    //       commit('SET_TOKENTYPE', data.token_type)
    //       commit('SET_UID', data.params.uid)
    //       setUid(data.params.uid)
    //       setUserStatus(data.status)
    //       setToken(data.token)
    //       setTokenType(data.token_type)
    //       setRefreshToken(data.refresh_token)
    //       resolve()
    //     })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },
    saveStatus({ commit }, data) {
        commit('SET_USERSTATUS', data.status)
        setUserStatus(data.status)
    },
    saveTokenOpenId({ commit }, data) {
        commit('SET_USERSTATUS', data.status)
        commit('SET_TOKEN', data.token)
        commit('SET_OPENID', data.openid)
        commit('SET_REFRESHTOKEN', data.refresh_token)
        commit('SET_TOKENTYPE', data.token_type)
        commit('SET_UID', data.uid)
        setUid(data.uid)
        setUserStatus(data.status)
        setToken(data.token)
        setTokenType(data.token_type)
        setRefreshToken(data.refresh_token)
        setOpenid(data.openid)
    },
    saveOpenId({ commit }, data) {
        commit('SET_OPENID', data.openid)
        setOpenid(data.openid)
    },
    // 无痛刷新token
    refreshToken({ commit }, data) {
        commit('SET_TOKEN', data.token)
        commit('SET_TOKENTYPE', data.token_type)
        commit('SET_UID', data.params.uid)
        setUid(data.params.uid)
        setToken(data.token)
        setTokenType(data.token_type)
    },
    // get user info
    // getInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo({ AdminID: state.uid }).then(response => {
    //       const { data } = response
    //       commit('SET_USERINFO', data)
    //       resolve()
    //     })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // user logout
    // logout({ commit, state, dispatch }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_REFRESHTOKEN', '')
    //       commit('SET_TOKENTYPE', '')
    //       commit('SET_ADMINNAME', '')
    //       commit('SET_UID', '')
    //       removeUid()
    //       removeToken()
    //       // resetRouter()
    //       removeTokenType()
    //       removeRefreshToken()
    //       dispatch('tagsView/delAllViews', null, { root: true })
    //       resolve()
    //     })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_REFRESHTOKEN', '')
            commit('SET_TOKENTYPE', '')
            commit('SET_UID', '')
            commit('SET_USERSTATUS', '')
            commit('SET_OPENID', '')
            commit('SET_USERINFO', '')
            removeUid()
            removeToken()
                // resetRouter()
            removeTokenType()
            removeRefreshToken()
            removeUserStatus()
            removeOpenid()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
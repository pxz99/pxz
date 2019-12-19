export const state = () => ({
  userInfo: {
    token: "",
    user: {}
  }
})

export const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

// actions负责发送异步请求
export const actions = {
  setUserInfo(context, userInfo) {
    // console.log(context);
    return this.$axios.post('/accounts/login', userInfo).then(res => {
      if (res.status === 200) {
        context.commit('setUserInfo', res.data)
        localStorage.setItem('travel_user', JSON.stringify(res.data))
      }
      return res
    })
  }
}

import instance from './axios'

//Season.vue
export const getEpDetail = data => instance.get(`/tv/${data.id}/season/${data.num}/episode/${data.ep}?api_key=${process.env.VUE_APP_KEY}&append_to_response=credits`)

export const getSeasonEpLength = data => instance.get(`/tv/${data.id}/season/${data.num}?api_key=${process.env.VUE_APP_KEY}&language=en-US`)

//Login.vue



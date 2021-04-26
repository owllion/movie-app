import instance from './axios'

//Season.vue
export const getEpDetail = data => instance.get(`/tv/${data.id}/season/${data.num}/episode/${data.ep}?api_key=${process.env.VUE_APP_KEY}&append_to_response=credits`)

export const getSeasonEpLength = data => instance.get(`/tv/${data.id}/season/${data.num}?api_key=${process.env.VUE_APP_KEY}&language=en-US`)

//TV.vue
export const getTvDetail = data => instance.get(`/tv/${data}?api_key=${process.env.VUE_APP_KEY}&append_to_response=videos,credits,reviews`)

//Movie.vue
export const getMovieDetail = data => instance.get(`/movie/${data}?api_key=${process.env.VUE_APP_KEY}&append_to_response=videos,credits,reviews`)

//Backdrop.vue
export const rateShow = ( data , payload ) => instance.post(`/${data.type}/${data.id}/rating?api_key=${process.env.VUE_APP_KEY}&guest_session_id=${data.guestId}`, payload )


//Login.vue
export const getToken = () => instance.get(`/authentication/token/new?api_key=${process.env.VUE_APP_KEY}`)

export const getGusetId = () => instance.get(`/authentication/guest_session/new?api_key=${process.env.VUE_APP_KEY}`)

//Search.vue
export const search = data => instance.get(`/search/multi?api_key=${process.env.VUE_APP_KEY}&language=en-US&query=${data}&page=1&include_adult=false`)

//Home.vue
export const getMoviePopular = () => instance.get(`/movie/popular?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

export const getTvPopular = () => instance.get(`/tv/popular?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`) 

//People.vue
export const getPersonDetail = data => instance.get(`/person/${data}?api_key=${process.env.VUE_APP_KEY}&append_to_response=combined_credits,images`)

//Home-TV.vue
export const getAirToday  = () => instance.get(`/tv/airing_today?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

export const getTvTopRated = () => instance.get(`/tv/top_rated?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

export const getOnAir = () => instance.get(`/tv/on_the_air?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

//Home-movie
export const getMovieTopRated = () => instance.get(`/movie/top_rated?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

export const getUpcoming = () => instance.get(`/movie/upcoming?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

export const getNowPlaying = () => instance.get(`/movie/now_playing?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)
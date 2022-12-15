export const state = () => ({
  topAlbum: {},
  teasers: [],
  alboms: []
})


export const mutations = {
  STORE_TOP_ALBUM (state, data) {
    state.topAlbum = data.topAlbum
  },
  STORE_TEASERS (state, data) {
    state.teasers = data
  },
  STORE_ALBOMS (state, data) {
    state.alboms = state.alboms.concat(data)
  }
}

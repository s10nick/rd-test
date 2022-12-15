<template>
  <div>
    <div v-for="(item, index) in content">
      <span>#{{ index + 1 }}.</span>
      <span v-if="index === 0">{{ item.name }}</span>
      <div v-if="index === 0" class="divider"></div>
      <span v-if="index === 1 || index === 3 || index > 4">
        current - {{ item.current }} ||
        type - {{ item.type }} ||
        id - {{ item.id }} ||
        slug - {{ item.slug }} ||
        name - {{ item.name }}
      </span>
      <div v-if="index === 1 || index === 3 || index > 4" class="content-block">
        <div v-if="item.series.length > 0" v-for="series in item.series" class="series">
          <span>
            id - {{ series.id }} <br>
            name - {{ series.name }} <br>
            lowestPrice - {{ series.lowest_price }} <br>
            albumsCount - {{ series.albums_count }} <br>
          </span>
        </div>
      </div>
      <span v-if="index === 2 || index === 4">Teasers</span>
      <div v-if="index === 2 || index === 4" class="content-block">
        <div v-for="teaser in item" class="teaser">
          {{ teaser }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import _ from "lodash"
  import * as API from '~/api'
export default {
  name: 'IndexPage',
  data() {
    return {
      albomCurentId: 0,
    }
  },
  computed: {
    content() {
      return  []
        .concat(this.topAlbum)
        .concat(_.filter(this.alboms, {'type': 'new'}))
        .concat([ [this.teasers[0], this.teasers[1]] ])
        .concat(_.filter(this.alboms, {'type': 'top'}))
        .concat([ [this.teasers[2]] ])
        .concat(_.filter(this.alboms, album => (album.type !== 'new') && (album.type !== 'top')))
    },
    ...mapState({
      topAlbum: state => state.topAlbum,
      teasers: state => state.teasers,
      alboms: state => state.alboms
    })
  },
  beforeMount() {
    this.fetchTopAlbum()
    this.fetchALboms(0)
  },
  mounted() {
    this.fetchTeasers()
    this.fetchALboms(1)
  },
  methods: {
    async fetchTopAlbum () {
      try {
        const response = await API.topAlbum()
        this.$store.commit('STORE_TOP_ALBUM', response.data)
      } catch (err) {
        throw new Error((err && err.data && err.data.msg) || 'Failed to STORE_TOP_ALBUM')
      }
    },
    async fetchTeasers () {
      try {
        const response = await API.teasers()
        this.$store.commit('STORE_TEASERS', response.data.list)
      } catch (err) {
        throw new Error((err && err.data && err.data.msg) || 'Failed to STORE_TEASERS')
      }
    },
    async fetchALboms (current) {
      try {
        const response = await API.alboms(current)
        if (response.data === {}) {
          return
        } else {
          this.$store.commit('STORE_ALBOMS', response.data)
          this.albomCurentId = Number(response.data.current) + 1
          if (Number(response.data.current) > 0) {
            this.fetchALboms(Number(response.data.current) + 1)
          }
        }
      } catch (err) {
        throw new Error((err && err.data && err.data.msg) || 'Failed to STORE_ALBOMS')
      }
    },
  }
}
</script>

<style scoped>
  .series {
    margin-top: 10px;
    width: 180px;
    height: 130px;
    border: 2px solid grey;
    margin-right: 10px;
    padding: 10px;
  }
  .teaser {
    margin-top: 10px;
    width: 180px;
    height: 100px;
    border: 2px solid grey;
    margin-right: 10px;
    padding: 10px;
    font-size: 12px;
  }
  .content-block {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .divider {
    margin-bottom: 20px;
  }
</style>

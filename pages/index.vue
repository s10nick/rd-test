<template>
  <div>
    <div v-for="(item, index) in content">
      <span>#{{ index + 1 }}.</span>
      <span v-if="index === 0">{{ item.name }}</span>
      <div v-if="index === 0" class="divider"></div>
      <span v-if="index === 1 || index === 3 || index > 4">
        current - {{ item[0].current }} ||
        type - {{ item[0].type }} ||
        id - {{ item[0].id }} ||
        slug - {{ item[0].slug }} ||
        name - {{ item[0].name }}
      </span>
      <div v-if="index === 1 || index === 3 || index > 4" class="content-block">
        <div v-if="item[0].series.length > 0" v-for="series in item[0].series" class="series">
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
          id - {{ teaser.id }} <br>
          titleBold - {{ teaser.title_bold }} <br>
          titleNormal - {{ teaser.title_normal }} <br>
          url - {{ teaser.url }} <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import _ from "lodash"
export default {
  name: 'IndexPage',
  data() {
    return {
      albomCurentId: 0
    }
  },
  computed: {
    content() {
      return [
        this.topAlbum,
        _.filter(this.alboms, {'type': 'new'}),
        [ this.teasers[0], this.teasers[1] ],
        _.filter(this.alboms, {'current': 1}),
        [ this.teasers[2] ],
        _.filter(this.alboms, {'current': '4'}),
        _.filter(this.alboms, {'current': '5'})
      ]
    },
    ...mapState({
      topAlbum: state => state.topAlbum,
      teasers: state => state.teasers,
      alboms: state => state.alboms
    })
  }
}
</script>

<style scoped>
  .series {
    width: 180px;
    height: 130px;
    border: 2px solid grey;
    margin-right: 10px;
    padding: 10px;
  }
  .teaser {
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

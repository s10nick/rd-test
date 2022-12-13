<template>
  <div>
    <div v-for="(item, index) in content">
      <span>#{{ index + 1 }}.</span>
      <span v-if="index === 0">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import _ from "lodash"
export default {
  name: 'IndexPage',
  computed: {
    content() {
      return [
        this.topAlbum,
        _.filter(this.alboms, {'type': 'new'}),
        [ this.teasers[0], this.teasers[1] ],

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

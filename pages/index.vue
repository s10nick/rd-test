<template>
  <div>#1. {{ topAlbum.name }}</div>
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

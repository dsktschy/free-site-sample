<template>
  <div>
    <h1 class="title">
      {{ content.title.ja_jp }}
    </h1>
    <client-only placeholder="Loading...">
      <VueAgile autoplay class="slider">
        <div
          v-for="(item, index) of content.images"
          :key="item.id"
          :style="{ 'background-image': `url(${item.value.url})` }"
          class="slide"
        >
          <p class="slide-text">{{ content.texts[index].value.ja_jp }}</p>
        </div>
      </VueAgile>
    </client-only>
  </div>
</template>

<script>
import { VueAgile } from 'vue-agile'
import { getContent } from '~/assets/js/pages-fetcher'
import { create as createHead } from '~/assets/js/head-creator'

export default {
  components: {
    VueAgile
  },

  async asyncData({ route }) {
    return {
      content: await getContent(route.name)
    }
  },

  head() {
    return createHead(
      this.$siteData.title.ja_jp,
      this.$siteData.description.ja_jp,
      this.$siteData.ogImage.url,
      `${process.env.BASE_URL}${this.$route.path}`
    )
  }
}
</script>

<style scoped>
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.slide-text {
  font-size: 30px;
  font-weight: bold;
  color: gray;
}
</style>
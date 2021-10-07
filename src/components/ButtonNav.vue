<template>
  <router-link :to="$props.link">
    <div :class="isDown"
        class="transition duration-250 ease-in-out w-12 h-12 text-white bg-riotGray-light
         hover:bg-riotGray-lightest active:bg-riotGray-light bg-opacity-75 flex justify-center items-center">
      <font-awesome-icon class="text-white" :icon="['fas', $props.content]" />
    </div>
  </router-link>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: "ButtonNav",
  props: {
    link: {
      type: String,
      default: "/"
    },
    content: {
      default: "th-large",
    }
  },
  computed: {
    isDown() {
      let store = useStore()
      if (store.getters.getDownloadState && this.props.content === "th-large"){
        return "rounded-full"
      } else {
        return "rounded-2xl"
      }
    }
  }
}
</script>

<style>
</style>

<template>
  <router-link :to="$props.link">
    <div class="rounded-2xl w-12 h-12 bg-riotGray-light
         hover:bg-riotGray-lightest active:bg-riotGray-light bg-opacity-75 flex justify-center items-center">
      <p class="text-white">{{ $props.content }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ButtonNav",
  props: {
    link: {
      type: String,
      default: "/"
    },
    content: {
      type: String,
      default: "田",
    }
  }
}
</script>

<style scoped>

</style>

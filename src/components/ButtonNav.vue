<template>
  <router-link :to="$props.link">
    <div class="rounded-2xl w-12 h-12 text-white bg-riotGray-light
         hover:bg-riotGray-lightest active:bg-riotGray-light bg-opacity-75 flex justify-center items-center">
      <font-awesome-icon class="text-white" :icon="['fas', $props.content]" />
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
      default: "th-large",
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="game-list-item box-content">
    <div
        class="hoverBox p-1 rounded-xl transform transition duration-100 ease-in-out border-4 border-riotGray border-solid
              hover:animate-gameItemHover_scale hover:border-4 hover:border-riotGray-lightest hover:border-solid">
      <router-link :to="$props.gameLink">
        <img class="" :src="$props.gameImage" alt/>
      </router-link>
    </div>
    <div class="titleBox px-5 flex flex-row">
      <img class="" :src="$data.riotIcon" alt="" height="50" width="50">
      <p class="game-title text-white font-light text-left py-2">{{ $props.gameTitle }}</p>
    </div>
  </div>
</template>

<script>
import defaultImg from "@/assets/images/myGameItem.png"
import riotIcon from "@/assets/images/gameTitleIcon-Riot.png"

export default {
  name: "myGameItem",
  data() {
    return {
      riotIcon
    }
  },
  props: {
    gameTitle: {
      type: String,
      default: "游戏名称"
    },
    gameImage: {
      default: defaultImg
    },
    gameLink: {
      type: String,
      default: "/myGame"
    }
  }
}
</script>

<style scoped>

</style>

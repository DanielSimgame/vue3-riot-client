<template>
  <div class="game-list-item box-content relative group">
    <div class="child-bg absolute bg-transparent transition group-hover:animate-gameItemHover_bgcolor w-80 h-60" style="left: -10px;top: -10px;z-index: 0"></div>
    <div
        class="hoverBox p-1 rounded-xl transform transition duration-100 ease-in-out border-4 border-riotGray border-solid
              group-hover:animate-gameItemHover_scale animate-rotate group-hover:border-4 group-hover:border-riotGray-lightest group-hover:border-solid"
        style="z-index: 1;background-color: #1a232a;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);box-sizing: border-box;">
      <router-link :to="$props.gameLink">
        <img class="" :src="$props.gameImage" alt/>
      </router-link>
    </div>
    <div class="myGameBox px-5 flex flex-row" style="z-index: 2">
<!--      <img class="" v-if="$props.iconType === 1" :src="$props.gameIcon" alt="" height="50" width="50">-->
      <font-awesome-icon v-if="$props.iconType === 1" class="text-white text-4xl my-auto mx-1.5" :icon="['fas', 'fist-raised']" />
      <font-awesome-icon v-else-if="$props.iconType === 2" class="text-white text-4xl my-auto mx-1.5" :icon="['fas', 'gamepad']" />
      <p class="game-title text-white font-light text-left py-2">{{ $props.gameTitle }}</p>
    </div>
  </div>
</template>

<script>
import defaultImg from "@/assets/images/myGameItem.png"
import defaultIcon from "@/assets/images/gameTitleIcon-Riot.png"

export default {
  name: "myGameItem",
  data() {
    return {
      riotIcon: defaultIcon
    }
  },
  props: {
    gameTitle: {
      type: String,
      default: "游戏名称",
      required: true
    },
    iconType: {
      type: Number,
      required: true
    },
    gameIcon: {
      default: defaultIcon
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

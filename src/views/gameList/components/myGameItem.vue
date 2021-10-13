<template>
  <div class="game-list-item box-content relative">
<!--    <div class="child-bg absolute bg-transparent transition"-->
<!--         style="left: -10px;top: -10px;z-index: 0"></div>-->
    <div
        class="hoverBox rounded-xl transform transition duration-100 ease-in-out border-riotGray border-solid
              hover:animate-gameItemHover_scale">
      <div class="hoverBox-inner">
        <router-link :to="$props.gameLink">
          <img class="" :src="$props.gameImage" alt/>
        </router-link>
      </div>
    </div>
    <div class="myGameBox px-5 flex flex-row" style="z-index: 2">
      <!--      <img class="" v-if="$props.iconType === 1" :src="$props.gameIcon" alt="" height="50" width="50">-->
      <font-awesome-icon v-if="$props.iconType === 1" class="text-white text-4xl my-auto mx-1.5"
                         :icon="['fas', 'fist-raised']"/>
      <font-awesome-icon v-else-if="$props.iconType === 2" class="text-white text-4xl my-auto mx-1.5"
                         :icon="['fas', 'gamepad']"/>
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
.hoverBox {
  position: relative;
  /*padding有关边框厚度*/
  padding: 4px;
  z-index: 1;
  /*width: 400px;*/
  /*height: 300px;*/
  /*margin: 20px;*/
  border-radius: 10px;
  overflow: hidden;
  box-sizing: content-box;
  background-clip: content-box;
  /*padding: 2rem;*/
}

.hoverBox::before {

  content: '';
  position: absolute;
  z-index: -2;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: none;
  animation: rotate 4s linear infinite;
}
.hoverBox:hover::before {
  background-color: #4A4A4A;
  background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
}

.hoverBox::after {
  content: '';
  position: absolute;
  z-index: -1;
  /*上左边框宽度*/
  left: 4px;
  top: 4px;
  /*下右边框宽度*/
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  background: #1C1C1C;
  border-radius: 4px;
}

.hoverBox-inner{
  border-radius: 5px;
  border: #1c1c1c 5px solid;
}
</style>

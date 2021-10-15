<template>
  <div class="game-list-item box-content">
    <div class="hover-box-father relative">
      <div
          class="hover-box rounded-xl transform transition duration-100 ease-in-out border-riotGray border-solid
              hover:animate-gameItemHover_scale"
          :id="'hover-box-' + $props.index"
          @mouseenter="onMouseEnterHandler"
          @mousemove="onMouseMoveHandler"
          @mouseleave="onMouseLeaveHandler">
        <div class="hover-box-inner">
          <router-link :to="$props.gameLink">
            <img class="" :src="$props.gameImage" alt/>
          </router-link>
        </div>
      </div>
      <div class="hover-box-bg" :id="'hover-box-bg-' + $props.index"></div>
    </div>
    <div class="myGameBox px-5 flex flex-row" style="z-index: 2">
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
import {nextTick} from "vue";

let count = 0
let nonResetCount = 0
let updateRate = 10
let hover_box_id = 'hover-box'
let componentIndex = 0
let elem = null
let rect = null
let center = {}
let mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
}

export default {
  name: "myGameItem",
  data() {
    return {
      riotIcon: defaultIcon,
      hover_box_id,
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    gameTitle: {
      type: String,
      default: "GameName",
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
  },
  mounted() {
    nextTick(() => {
      elem = document.querySelector('.hover-box')
      rect = elem.getBoundingClientRect()
      center = {
        x: rect.left + (rect.right - rect.left) / 2,
        y: rect.top + (rect.bottom - rect.top) / 2
      }
      mouse._x = center.x
      mouse._y = center.y
      componentIndex = this.$props.index
      hover_box_id = 'hover-box-' + componentIndex
      console.log(`rect.x == ${rect.x}, center.x == ${center.x},
       mouse._x ==${mouse._x}, componentIndex = ${componentIndex}`)
    })
  },
  methods: {
    /**
     * Make .hover-box - background rotate with mouse movement
     * @param event Mouse event
     * */
    update(event) {
      this.updatePosition(event)
      mouse.x = elem.offsetLeft + elem.width / 2
      mouse.y = elem.offsetTop + elem.height / 2
      this.updateTransformStyle(mouse.x, mouse.y)
      console.log(`updated: mouse: x:${mouse.x}, _x:${mouse._x}, y:${mouse.y}, _y:${mouse._y},
      #hover-box.height == ${rect.height},#hover-box.width == ${rect.width},`)
    },
    /**
     * Calculate and update --rotate-deg in :root
     * @param x Abscissa x
     * @param y Ordinate y
     * */
    updateTransformStyle(x, y) {
      let angle = Math.atan2(y - mouse._y, x - mouse._x) / (Math.PI / 180) + 60
      let style = 'rotate(' + angle + 'deg)'
      // let style = 'transform: rotate(' + angle + ')'
      let _hover_box_bg = document.querySelector('.hover-box-bg-active')
      _hover_box_bg.style.transform = style
      let root = document.documentElement.style
      root.setProperty('--rotate-deg', angle + 'deg')
      console.log(root.getPropertyValue('--rotate-deg'))
    },
    /**
     * Get mouse relative position (related to element center(0, 0))
     * @param event Mouse event
     * */
    updatePosition(event) {
      let e = event || Event
      mouse.x = e.clientX - mouse._x
      mouse.y = (e.clientY - mouse._y) * -1
    },
    /**
     * Control func update() execution, when isTimeToUpdate() returns true.
     * when _counter == updateRate's integral multiple, execute update().
     * which means isTimeToUpdate() executes 10 times, update() executes once.
     * */
    isTimeToUpdate() {
      nonResetCount++
      return count++ % updateRate === 0;
    },
    /**
     * Mouse move-in event handler
     * When mouse enter, .hover-box background-image rotate
     * @param event Mouse event
     * */
    onMouseEnterHandler(event) {
      let _hover_box_bg = document.querySelector('.hover-box-bg')
      _hover_box_bg.classList.add('hover-box-bg-active')
      this.$options.methods.update(event)
    },
    /**
     * Mouse movement event handler
     * When mouse move in the element, .hover-box background-image rotate
     * @param event Mouse event
     * */
    onMouseMoveHandler(event) {
      nextTick(() => {
        if (this.$options.methods.isTimeToUpdate()) {
          this.$options.methods.update(event)
        }
      })
    },
    /**
     * Mouse move-out event handler
     * When mouse move out, reset .hover-box style, reset counter && updateRate in $data
     * */
    onMouseLeaveHandler() {
      nextTick(() => {
        let _hover_box_bg = document.querySelector('.hover-box-bg')
        _hover_box_bg.classList.remove('hover-box-bg-active')
        count = 0
      })
    },
  }
}
</script>

<style>
:root {
  --rotate-deg: 0deg;
}

.hover-box-father {
  overflow: hidden;
  border-radius: 10px;
}

.hover-box {
  position: relative;
  /*padding is about thick of border*/
  padding: 4px;
  z-index: 1;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: content-box;
  background-clip: content-box;
}

.hover-box-bg {
  position: absolute;
  z-index: -1;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: none;
  transition: transform 0.5s;
}

.hover-box-bg-active {
  background-color: #4A4A4A !important;
  background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%) !important;
  transition: transform 0.5s;
}

.hover-box::before {
  /*content: '';*/
  /*position: absolute;*/
  /*z-index: -2;*/
  /*left: -50%;*/
  /*top: -50%;*/
  /*width: 200%;*/
  /*height: 200%;*/
  /*background-color: transparent;*/
  /*background-repeat: no-repeat;*/
  /*background-position: 0 0;*/
  /*background-image: none;*/
  /*transition: transform 0.5s;*/
  /*transform: rotate(var(--rotate-deg));*/
}

.hover-box:hover::before {
  /*background-color: #4A4A4A;*/
  /*background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);*/
}

.hover-box::after {
  /*content: '';*/
  /*position: absolute;*/
  /*z-index: -1;*/
  /*!*Top and Left border thick*!*/
  /*left: 4px;*/
  /*top: 4px;*/
  /*!*Bottom and Right border thick*!*/
  /*width: calc(100% - 8px);*/
  /*height: calc(100% - 8px);*/
  /*background: #1C1C1C;*/
  /*border-radius: 4px;*/
}

.hover-box-inner {
  border-radius: 5px;
  border: #1c1c1c 5px solid;
}
</style>

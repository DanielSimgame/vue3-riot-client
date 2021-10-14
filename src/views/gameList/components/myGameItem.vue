<template>
  <div class="game-list-item box-content">
    <!--    <div class="child-bg absolute bg-transparent transition"-->
    <!--         style="left: -10px;top: -10px;z-index: 0"></div>-->
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
import {nextTick} from "vue";

let count = 0
let nonResetCount = 0
let updateRate = 1
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
     * 根据鼠标移动的距离来改变 .hover-box 的background旋转角度。
     * @param event 鼠标事件
     * */
    update(event) {
      this.updatePosition(event)
      mouse.x = elem.offsetLeft + elem.width / 2
      mouse.y = elem.offsetTop + elem.height / 2
      this.updateTransformStyle(mouse.x, mouse.y)
      console.log(`updated: mouse: x:${mouse.x}, _x:${mouse._x}, y:${mouse.y}, _y:${mouse._y},
      元素#hover-box.height == ${rect.height},元素#hover-box.width == ${rect.width},`)
    },
    /**
     * 计算并更新元素样式的 transform 属性。
     * @param x 坐标x
     * @param y 坐标y
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
     * 获取鼠标当前相对(0,0)的坐标位置。
     * @param event 鼠标事件
     * */
    updatePosition(event) {
      let e = event || Event
      mouse.x = e.clientX - mouse._x
      mouse.y = (e.clientY - mouse._y) * -1
    },
    /**
     * 控制 update() 执行次数，只有当其的返回值为 true 时才执行update()。
     * 为减少 update() 执行次数，以提高代码性能。
     * 当 _counter 值是 updateRate 整数倍时，更新才发生。
     * 表示 isTimeToUpdate() 每执行 1 次，更新才发生一次。
     * */
    isTimeToUpdate() {
      nonResetCount++
      return count++ % updateRate === 0;
    },
    /**
     * 处理鼠标进入事件。
     * 鼠标进入时使.hover-box的背景旋转。
     * @param event 鼠标事件
     * */
    onMouseEnterHandler(event) {
      let _hover_box_bg = document.querySelector('.hover-box-bg')
      _hover_box_bg.classList.add('hover-box-bg-active')
      this.$options.methods.update(event)
    },
    /**
     * 处理鼠标移动事件。
     * 当鼠标移动时改变.hover-box背景旋转角度。
     * @param event 鼠标事件
     * */
    onMouseMoveHandler(event) {
      nextTick(() => {
        if (this.$options.methods.isTimeToUpdate()) {
          this.$options.methods.update(event)
        }
      })
    },
    /**
     * 处理鼠标离开事件。
     * 鼠标离开时，重置.hover-box样式与$data中counter, updateRate值。
     * */
    onMouseLeaveHandler() {
      nextTick(() => {
        let _hover_box_bg = document.querySelector('.hover-box-bg')
        _hover_box_bg.classList.remove('hover-box-bg-active')
        count = 0
        // .getComputedStyle(':before')
        // this.$refs.hoverBox.style = null
      })
    },
    /**
     * 用来展示鼠标当前位置，仅作测试用。
     * @param mouse mouse对象
     * */
    show(mouse) {
      return '(' + mouse.x + ', ' + mouse.y + ')'
    }
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
  /*padding有关边框厚度*/
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
  /*!*上左边框宽度*!*/
  /*left: 4px;*/
  /*top: 4px;*/
  /*!*下右边框宽度*!*/
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

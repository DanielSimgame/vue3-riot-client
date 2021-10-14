<template>
  <div class="game-list-item box-content relative">
    <!--    <div class="child-bg absolute bg-transparent transition"-->
    <!--         style="left: -10px;top: -10px;z-index: 0"></div>-->
    <div
        class="hoverBox rounded-xl transform transition duration-100 ease-in-out border-riotGray border-solid
              hover:animate-gameItemHover_scale"
        ref="hoverBox"
        @mouseenter="onMouseEnterHandler"
        @mousemove="onMouseMoveHandler"
        @mouseleave="onMouseLeaveHandler">
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
      riotIcon: defaultIcon,
      counter: 0,
      updateRate: 0,
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
  },
  mounted() {
    let _hoverBox = this.$refs.hoverBox
    mouse.setOrigin(this.$refs.hoverBox)
  },
  methods: {
    /**
     * 根据鼠标移动的距离来改变 .hoverBox 的background旋转角度。
     * @param event 鼠标事件
     * */
    update: (event) => {
      let _self = this
      this.$nextTick(() => {
        let _hoverBox = _self.$refs.hoverBox
        mouse.updatePosition(event)
        _self.$options.methods.updateTransformStyle(
            (mouse.y / _hoverBox.offsetHeight / 2).toFixed(2),
            (mouse.x / _hoverBox.offsetWidth / 2).toFixed(2)
        )
      })
    },
    /**
     * 更新元素样式的 transform 属性。
     * @param x 坐标x
     * @param y 坐标y
     * */
    updateTransformStyle: (x, y) => {
      let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)"
      this.$nextTick(() => {
        let _hoverBox = this.$refs.hoverBox
        _hoverBox.style.transform = style
        _hoverBox.style.webkitTransform = style
        _hoverBox.style.mozTransform = style
        _hoverBox.style.msTransform = style
        _hoverBox.style.oTransform = style
      })
    },
    /**
     * 控制 update() 执行次数，只有当其的返回值为 true 时才执行update()。
     * 为减少 update() 执行次数，以提高代码性能。
     * 当 counter 值是 updateRate 整数倍时，更新才发生。
     * 表示 isTimeToUpdate() 每执行 10 次，更新才发生一次。
     * */
    isTimeToUpdate: () => {
      return this.$data.counter++ % this.$data.updateRate === 0
    },
    /**
     * 处理鼠标进入事件。
     * 鼠标进入时使.hoverBox的背景旋转。
     * @param event 鼠标事件
     * */
    onMouseEnterHandler: (event) => {
      this.$options.methods.update(event)
    },
    /**
     * 处理鼠标移动事件。
     * 当鼠标移动时改变.hoverBox背景旋转角度。
     * @param event 鼠标事件
     * */
    onMouseMoveHandler: (event) => {
      if (this.$options.methods.isTimeToUpdate()) {
        this.$options.methods.update(event)
      }
    },
    /**
     * 处理鼠标离开事件。
     * 鼠标离开时，重置.hoverBox样式与$data中counter, updateRate值。
     * */
    onMouseLeaveHandler: () => {
      this.$nextTick(() => {
        this.$refs.hoverBox.style = null
      })
    }
  }
}

let mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  /**
   * 获取鼠标当前相对(0,0)的坐标位置。
   * @param event 鼠标事件
   * */
  updatePosition: (event) => {
    let e = event || Event
    this.x = e.clientX - this._x
    this.y = (e.clientY - this._y) * -1
  },
  /**
   * 设置鼠标的初始坐标，即把.hoverBox的中心位置设为(0,0)。
   * @param dom dom元素
   * */
  setOrigin: (dom) => {
    this._x = dom.offsetLeft + Math.floor(dom.offsetWidth / 2)
    this._y = dom.offsetTop + Math.floor(dom.offsetHeight / 2)
  },
  /**
   * 用来展示鼠标当前位置，仅作测试用。
   * */
  show: () => {
    return '(' + this.x + ', ' + this.y + ')'
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
  /*animation: rotate 4s linear infinite;*/
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

.hoverBox-inner {
  border-radius: 5px;
  border: #1c1c1c 5px solid;
}
</style>

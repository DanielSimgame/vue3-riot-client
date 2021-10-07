<template>
  <div class="max-w-full bg-riotGray">
    <div class="container mx-auto max-w-7xl px-5 py-5 flex flex-col items-center">
      <div class="title max-w-full min-w-full">
        <h2 class="text-white text-3xl font-light text-left">我的游戏</h2>
      </div>
      <div class="game-list grid gap-10 grid-cols-4 my-16">
        <my-game-item game-title="VALORENTE"></my-game-item>
      </div>
    </div>
  </div>
</template>

<script>

import MyGameItem from "@/pages/gameList/components/myGameItem.vue";
export default {
  name: "myGameList",
  components: {MyGameItem},
  data() {
    return {
      gameItemBox: {
        width: 310,
        height: 207,
        boxWidth: 315,
        boxHeight: 212,
        itemHeight: 257
      }
    }
  }
}
</script>

<style scoped>

</style>

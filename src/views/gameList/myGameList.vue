<template>
  <div class="max-w-full bg-riotGray">
    <universal-header></universal-header>
    <div class="container mx-auto max-w-7xl px-5 py-5 flex flex-col items-center">
      <div class="title max-w-full min-w-full">
        <h2 class="text-white text-3xl font-light text-left">我的游戏</h2>
      </div>
      <div class="game-list grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 my-16">
        <my-game-item v-for="(item, index) in myGamesListArr"
                      :game-title="item.gameTitle"
                      :iconType="item.iconType"
                      :game-icon="item.gameIcon">
        </my-game-item>
      </div>
    </div>
  </div>
</template>

<script>
import UniversalHeader from "@/components/UniversalHeader.vue";
import MyGameItem from "@/views/gameList/components/myGameItem.vue";
export default {
  name: "myGameList",
  components: {UniversalHeader, MyGameItem},
  data() {
    return {
      gameItemBox: {
        width: 310,
        height: 207,
        boxWidth: 315,
        boxHeight: 212,
        itemHeight: 257
      },
      myGamesListArr: [{
        gameTitle: "VALORENTEY",
        iconType: 1

      },{
        gameTitle: "LEGAL OF LEGENDS",
        iconType: 1
      },{
        gameTitle: "APEX PREDATOR",
        iconType: 2,
        gameIcon: "fa-gamepad"
      },{
        gameTitle: "Overwatcher",
        iconType: 1,
      }]
    }
  }
}
</script>

<style scoped>

</style>

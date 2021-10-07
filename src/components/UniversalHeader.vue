<template>
  <header class="bg-riotGray shadow">
    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-row justify-between">
      <ButtonNav link="/about" content="田" ></ButtonNav>
      <div class="">
        <h1
            class="text-white text-3xl font-bold leading-tight text-gray-900">
          {{ title }}
        </h1>
      </div>
      <ButtonNav link="/about" content="人" ></ButtonNav>
    </div>
  </header>
</template>

<script>
import {defineComponent} from "vue";
import ButtonNav from "@/components/ButtonNav.vue";

export default defineComponent({
  name: "UniversalHeader",
  components: {ButtonNav},
  data() {
    return {
      title: "KADaniel"
    }
  },
})
</script>

<style scoped>

</style>

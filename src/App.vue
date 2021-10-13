<template>
  <div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<!--<script setup>-->
<!--import { ref } from 'vue'-->

<!--let counter = ref(0)-->

<!--setInterval(() => {-->
<!--  counter.value++-->
<!--}, 1000)-->
<!--</script>-->
<script>
import UniversalHeader from "@/components/UniversalHeader.vue";
export default {
  components: {UniversalHeader}
}
</script>

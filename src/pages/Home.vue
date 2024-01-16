<template>
  <div class="home">

    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <TopsterCard v-for="(topster, idx) in state.topsters" :key="idx" :topster="topster" no-post="no" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, reactive} from "vue";
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  name: "Home",
  components: {TopsterCard,},
  setup() {
    const state = reactive({
      topsters: []
    });
    onMounted(() => {
      axios.get(`/topsters/top-three`).then((res) => {
        state.topsters = res.data;
      })
    })
    return {state}
  }
}
</script>

<style scoped>

</style>
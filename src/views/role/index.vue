<template>
  <div>
    <role-list />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import roleList from "./components/roleList.vue";
export default Vue.extend({
  components: {
    roleList,
  },
});
</script>

<style lang="sass" scoped></style>

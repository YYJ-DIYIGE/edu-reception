<template>
  <div class="skill-container">
    <div class="skill-list">
      <div
        class="skill-item"
        v-for="item in skill"
        :key="item.id"
        @click="answer(item.id)"
      >
        <div class="skill-name">{{ item.name }}</div>
        <img v-if="item.image_url" class="skill-logo" :src="item.image_url" />
      </div>
    </div>
  </div>
</template>
<script>
import API from "../gloabl/request/api";
export default {
  data() {
    return {
      skill: []
    };
  },
  created() {
    this.getSkill();
  },
  methods: {
    getSkill() {
      API.skill().then(res => {
        this.skill = res.stacks;
        console.log(res);
      });
    },
    answer(id) {
      this.$router.push({ path: "/skilltest/" + id, query: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
.skill-list {
  width: 1300px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .skill-item {
    padding: 0 10px;
    display: flex;
    justify-content: center;
    border: 1px solid;
    cursor: pointer;
    margin: 10px 10px;
    height: 30px;
    min-width: 100px;
    text-align: center;
    border-radius: 5px;
    .skill-name {
      font-size: 18px;
      line-height: 30px;
    }
    .skill-logo {
      margin-left: 5px;
      margin-top: 8px;
      width: 16px;
      height: 16px;
    }
  }
}
</style>

<template>
  <div class="subject-container">
    <div v-show="show">
      <div class="subject-tile">
        <div class="skill-name">{{ skill.name }}</div>
        <img v-if="skill.image_url" class="skill-logo" :src="skill.image_url" />
      </div>
      <div class="subject-total">共 {{ page }}/{{ subject.length }} 题</div>
      <div class="subject-list">
        <div class="subject-stem" v-html="subject[page - 1].stem"></div>
        <div
          :class="['subject-item', { active: index == ins }]"
          @click="next(index, subject[page - 1].currect)"
          v-for="(item, index) in subject[page - 1].option"
          :key="item.id"
          v-html="subject[page - 1].option[index]"
        ></div>
      </div>
      <div class="subject-correct">答对 {{ correct }} 题</div>
    </div>
    <div class="complete-show" v-show="!show">
      <div class="complete-title">答题完毕</div>
      <div class="complete-correct">
        一共答对了 {{ correct }} 题，不错哦！！！
      </div>
      <router-link class="return" :to="{ name: 'SkillTest' }">返回</router-link>
    </div>
  </div>
</template>
<script>
import API from "../gloabl/request/api";
export default {
  data() {
    return {
      show: true,
      skill: {
        name: "",
        image_url: null
      },
      subject: [
        {
          stem: "",
          currect: "",
          option: []
        }
      ],
      ins: null,
      page: 1,
      correct: 0
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    getSubject() {
      let id = this.$route.query.id;
      API.skillId(id).then(res => {
        this.skill = res.skill;
        this.subject = res.subject;
      });
    },
    next(index, currect) {
      this.ins = index;
      if (this.page >= this.subject.length) {
        setTimeout(() => {
          this.show = false;
        }, 1000);
        return;
      }
      if (index == currect) {
        this.correct++;
      }
      setTimeout(() => {
        this.page++;
        this.ins = null;
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.complete-show {
  text-align: center;
  .complete-title {
    font-size: 20px;
  }
  .complete-correct {
    margin: 20px 0;
  }
}
.subject-container {
  width: 1280px;
  margin: 0 auto;
  margin-top: 50px;
  .subject-correct {
    text-align: center;
    margin-top: 100px;
  }
  .subject-total {
    text-align: right;
    margin-top: 30px;
  }
  .subject-tile {
    display: flex;
    height: 30px;
    .skill-name {
      font-size: 18px;
      line-height: 30px;
    }
    .skill-logo {
      margin-left: 5px;
      margin-top: 9px;
      width: 16px;
      height: 16px;
    }
  }
  .subject-list {
    margin-top: 40px;
    .subject-stem {
      font-size: 28px;
    }
    .subject-item {
      border-radius: 10px;
      padding-left: 10px;
      height: 50px;
      cursor: pointer;
      line-height: 50px;
      box-shadow: 2px 2px 3px #aaaaaa;
      margin-top: 20px;
    }
    .subject-item.active {
      background: rgb(70, 69, 69);
      color: #e1dfe4;
    }
  }
}
</style>

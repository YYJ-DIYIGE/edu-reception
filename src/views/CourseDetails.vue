<template>
  <div class="course-container">
    <div class="course-crumbs">
      <div class="return-zhiye">职业课</div>
      <div class="crumbs-arrow">➡</div>
      <div class="crumbs-name">CSS</div>
    </div>
    <div class="course-section">
      <div class="course-detail">
        <div class="detail-left">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="detail-right">
          <div class="detail-title">
            <div class="course-name">HTML</div>
            <div class="course-tips">必修课</div>
          </div>
          <div class="course-desc">Web前端工程师是目前最火的互联网职业，它能充分理解项目需求和设计需求，并与设计师、后端工程师紧密合作，产出高质量的产品前端层，为用户呈现最好的界面交互体验。</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.course-container{
  padding: 30px 150px;
  margin: 0 auto;
  .course-crumbs{
    display: flex;
    height: 30px;
    .return-zhiye{
      line-height: 30px;
      color: #0b62e4;
      cursor: pointer;
      text-decoration:underline;
    }
    .crumbs-name{
      line-height: 30px;
    }
    .crumbs-arrow{
      line-height: 30px;
      margin: 0 5px;
    }
  }
  .course-section{
    width: 1480px;
    margin: 20px auto;
    .course-detail{
      display: flex;
      padding: 10px;
      border: 1px solid;
      .detail-left {
        img {
          width: 200px;
          height: 100%;
        }
      }
      .detail-right{
        margin-left: 20px;
        .detail-title{
          display: flex;
          height: 50px;
          .course-name{
            line-height: 50px;
            font-size: 28px;

          }
          .course-tips{
            line-height: 50px;
            margin-left: 20px;
            color: #211d1d;
          }
        }
        .course-desc{
          line-height: 25px;
          -webkit-line-clamp: 4;
          word-break: break-all;
          display: -webkit-box; /**对象作为伸缩盒子模型展示**/
          -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
          -webkit-line-clamp: 4; /**显示的行数**/
          overflow: hidden; /**隐藏超出的内容**/
        }
      }
    }
  }
}
</style>
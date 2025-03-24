<template>
  <div class="body">
    <div class="article-main">
      <div class="article-view">
        <LogoHeader />
        <div class="mypage-container">
          <div class="mypage-inner-bg">
            <div class="mypage-wrapper">
              <div class="mypage-classes">
                <span class="mypage-classes-text">내 클래스 관리</span>
                <div class="mypage-classes-classlist"><div class="mypage-classitem">asd</div></div>
              </div>

              <div class="mypage-activitys">
                <span class="mypage-activitys-text">내 활동</span>
                <div class="mypage-activitys-classlist">
                  <div class="mypage-activityitem">asd</div>
                </div>
              </div>

              <div class="mypage-comments">
                <span class="mypage-comments-text">내 댓글</span>
                <div class="mypage-comments-classlist">
                  <div class="mypage-commentitem">내 댓글</div>
                </div>
              </div>

              <div class="createClass">
                <div class="createClass-inner">
                  <router-link
                    class="createClass-btn"
                    :to="{
                      name: 'creatclass',
                      params: {},
                    }"
                  >
                    클래스 생성
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoHeader from '@/components/LogoHeader.vue'
</script>

<style>
.mypage-container {
  background: #26232d;
  width: 1100px;
  padding: 25px;
  border-radius: 10px 10px 0 0;
}

.mypage-inner-bg {
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  background: rgb(32, 32, 32);
  color: #cecece;
}

.mypage-wrapper {
  padding: 20px;
}

.mypage-classes,
.mypage-activitys,
.mypage-comments {
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  margin-bottom: 5vh;
}

.mypage-classes-text,
.mypage-activitys-text,
.mypage-comments-text {
  display: block;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid;
  border-color: #f2c53d;
  padding: 10px;
  background: rgb(59, 59, 59);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
}

.mypage-classes-classlist {
  padding: 10px;
}

.mypage-classitem {
  height: 100px;
  width: 100px;
  background: #77729f;
  border-radius: 50%;
}

.createClass-btn {
  padding: 12px 24px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #77729f;
  border: 1px solid #77729f;
  text-decoration: none;
  color: #d3d3d3;
}

.createClass-btn:hover {
  background-color: #77729f;
}
</style>

<template>
  <Profile />
  <div class="body">
    <div class="article-main">
      <div class="article-view">
        <LogoHeader />
        <div class="cc-container">
          <div class="cc-inner-bg">
            <div class="cc-wrapper">
              <div class="cc-name">
                <span class="cc-name-span">채널 이름 </span>
                <input
                  type="text"
                  class="cc-name-input"
                  placeholder=" 채널 이름"
                  v-model="className"
                />
              </div>

              <div class="cc-info">
                <span class="cc-info-span">채널 소개 </span>
                <input
                  type="text"
                  class="cc-info-input"
                  placeholder=" 채널 소개"
                  v-model="classInfo"
                />
              </div>

              <div class="cc-categorys">
                <div class="cc-categorys-add">
                  <span class="cc-categorys-span">카테고리</span>
                </div>

                <div class="cc-categorys-info">
                  <div class="cc-categorys-info-container">
                    <div class="cc-categorys-name">
                      <span class="cc-categorys-span">카테고리 이름</span>
                      <input
                        type="text"
                        class="cc-categorys-input"
                        placeholder=" 카테고리 이름"
                        v-model="categoryNameInput"
                      />
                    </div>
                    <div class="cc-categorys-auth">
                      <div class="cc-categorys-write">
                        <span class="cc-categorys-span">작성 권한</span>
                        <select
                          name=""
                          id=""
                          class="cc-categorys-writer"
                          placeholder="작성 권한"
                          v-model="categoryWriterAuth"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="test1">테스트 권한 1</option>
                          <option value="test2">테스트 권한 2</option>
                          <option value="test3">테스트 권한 3</option>
                        </select>
                      </div>
                      <div class="cc-categorys-read">
                        <span class="cc-categorys-span">읽기 권한</span>
                        <select
                          name=""
                          id=""
                          class="cc-categorys-reader"
                          placeholder="읽기 권한"
                          v-model="categoryReaderAuth"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="test1">테스트 권한 1</option>
                          <option value="test2">테스트 권한 2</option>
                          <option value="test3">테스트 권한 3</option>
                        </select>
                      </div>
                    </div>
                    <button class="cc-categorys-addbtn" @click="addCategory">+</button>
                  </div>
                </div>
                <div class="cc-categorys-list">
                  <div
                    v-for="(cat, index) in categoriesInfo"
                    :key="index"
                    class="cc-categorys-item"
                  >
                    <span>
                      {{ cat.name }} | 작성 권한: {{ cat.writer }} | 읽기 권한: {{ cat.reader }}
                    </span>
                    <button class="cc-categotys-delete" @click="deleteCategory(index)">-</button>
                    <!-- <div
                      class="div"
                      style="
                        display: flex;
                        border-bottom: 2px solid;
                        border-color: #77729f;
                        width: 100%;
                      "
                    >
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="cc-authoritys">
                <div class="cc-authoritys-name">
                  <span class="cc-categorys-span">권한</span>
                </div>

                <div class="cc-authoritys-admin">
                  <div class="cc-authoritys-adminHeader">
                    관리자
                    <div
                      v-for="(nickname, index) in authAdminArray"
                      :key="index"
                      class="nickname-item"
                    >
                      <span>{{ nickname }}</span>
                      <button class="cc-authoritys-delete" @click="deleteAdmin(index)">-</button>
                    </div>
                  </div>
                  <!-- admin 영역 add 버튼 -->
                  <button class="cc-authoritys-add" @click="openAdd('admin')">+</button>
                </div>

                <div class="cc-authoritys-member">
                  <div class="cc-authoritys-MemberHeader">
                    멤버
                    <div
                      v-for="(nickname, index) in authMemberArray"
                      :key="index"
                      class="nickname-item"
                    >
                      <span>{{ nickname }}</span>
                      <button class="cc-authoritys-delete" @click="deleteMember(index)">-</button>
                    </div>
                  </div>
                  <!-- member 영역 add 버튼 -->
                  <button class="cc-authoritys-add" @click="openAdd('member')">+</button>
                </div>
              </div>

              <div v-if="showInput" class="nickname-input-wrapper">
                <input
                  type="text"
                  v-model="newNickname"
                  placeholder="닉네임 입력"
                  class="nickname-input"
                />
                <button class="confirm-btn" @click="confirmAdd">확인</button>
                <button class="cancel-btn" @click="cancelAdd">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import LogoHeader from '@/components/LogoHeader.vue'
import Navbar from '@/components/Navbar.vue'
import Profile from '@/components/profile.vue'

import { ref } from 'vue'

const className = ref('')
const classInfo = ref('')
const categoryNameInput = ref('')
const categoryWriterAuth = ref('')
const categoryReaderAuth = ref('')

const categoriesInfo = ref<Array<{ name: string; writer: string; reader: string }>>([])

const authAdmin = ref('')
const newNickname = ref('')
const showInput = ref(false)
const currentSection = ref('')

const authAdminArray = ref<string[]>([])
const authMemberArray = ref<string[]>([])

const openAdd = (section: 'admin' | 'member') => {
  currentSection.value = section
  showInput.value = true
}

const confirmAdd = () => {
  const trimmed = newNickname.value.trim()
  if (trimmed) {
    if (currentSection.value === 'admin') {
      authAdminArray.value.push(trimmed)
    } else if (currentSection.value === 'member') {
      authMemberArray.value.push(trimmed)
    }
    newNickname.value = ''
    showInput.value = false
  }
}

const cancelAdd = () => {
  newNickname.value = ''
  showInput.value = false
}

// 삭제 함수들
const deleteAdmin = (index: number) => {
  authAdminArray.value.splice(index, 1)
}

const deleteMember = (index: number) => {
  authMemberArray.value.splice(index, 1)
}

// 카테고리 관련 (생략)
// 추가된 카테고리 정보를 저장할 배열

const addCategory = () => {
  if (categoryNameInput.value.trim() !== '') {
    categoriesInfo.value.push({
      name: categoryNameInput.value,
      writer: categoryWriterAuth.value,
      reader: categoryReaderAuth.value,
    })
    categoryNameInput.value = ''
    categoryWriterAuth.value = ''
    categoryReaderAuth.value = ''
  }
}

const deleteCategory = (index: number) => {
  categoriesInfo.value.splice(index, 1)
}
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  padding: 50px;
  gap: 30px;
}

input:focus {
  outline: none;
  border-color: #f2c53d;
}

.cc-container {
  background: #26232d;
  width: 1100px;
  padding: 25px;
  border-radius: 10px;
}

.cc-inner-bg {
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  background: rgb(32, 32, 32);
  color: #cecece;
}

.cc-wrapper {
  padding: 20px;
}

.cc-name,
.cc-info {
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
}

.cc-name {
  margin-top: 4vh;
}

.cc-name-span,
.cc-info-span,
.cc-categorys-span {
  font-size: 18px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.cc-name-input,
.cc-info-input,
.cc-categorys-input {
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  background: transparent;
  box-sizing: border-box;
  color: #cecece;
}

.cc-info-input {
  height: 100px;
}

.cc-categorys-name {
  display: flex;
}

.cc-categorys {
  width: 100%;
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  background: transparent;
  margin-bottom: 5vh;
  box-sizing: border-box;
  color: #cecece;
}

.cc-categorys-add {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid;
  border-color: #f2c53d;
  padding: 5px 10px 5px 10px;
  background: rgb(59, 59, 59);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
}

.cc-categorys-addbtn {
  display: flex;
  margin-left: auto;
  border: 2px solid;
  border-color: #f2c53d;
  border-radius: 50%;
  width: 1.5vw;
  height: 1.5vw;
  font-size: 1vw;
  align-items: center;
  justify-content: center;
  background: #f2c53d;
  color: #26232d;
}

.cc-categorys-info-container {
  display: flex;
  border-bottom: solid 2px;
  border-color: #77729f;
  align-items: center;
  padding: 10px;
  gap: 2vw;
  margin-bottom: 10px;
}

.cc-categorys-write,
.cc-categorys-read {
  display: flex;
  align-items: center;
}

.cc-categorys-writer,
.cc-categorys-reader {
  background: transparent;
  font-weight: bold;
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
  padding: 0.4em 1em;
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  color: #cecece;
  box-sizing: border-box;
}

.cc-categorys-writer:focus,
.cc-categorys-reader:focus {
  outline: none;
  border-color: #f2c53d;
}

.cc-categorys-addbtn:hover,
.cc-categotys-delete:hover {
  color: #cecece;
  background: #77729f;
}

.cc-categorys-auth {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 2vw;
}

.cc-categorys-item {
  display: flex;
  align-items: center;
  padding: 0px 10px 10px 10px;
  gap: 2vw;
}

.cc-categotys-delete,
.cc-authoritys-delete {
  display: flex;
  margin-left: auto;
  border: 2px solid;
  border-color: #f23d3d;
  border-radius: 50%;
  width: 1.5vw;
  height: 1.5vw;
  font-size: 1vw;
  align-items: center;
  justify-content: center;
  background: #f23d3d;
  color: #26232d;
}

.cc-authoritys {
  width: 100%;
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  background: transparent;
  margin-bottom: 5vh;
  box-sizing: border-box;
  color: #cecece;
}

.cc-authoritys-name {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid;
  border-color: #f2c53d;
  padding: 5px 10px 5px 10px;
  background: rgb(59, 59, 59);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
}

.cc-authoritys-admin {
  padding: 10px;
  border-bottom: 2px solid;
  border-color: #77729f;
}

.cc-authoritys-member {
  padding: 10px;
}

.cc-authoritys-add {
  display: flex;
  border: 2px solid #f2c53d;
  border-radius: 50%;
  width: 1.5vw;
  height: 1.5vw;
  font-size: 1vw;
  align-items: center;
  justify-content: center;
  background: #f2c53d;
  color: #26232d;
  margin: 0 auto;
}

.cc-authoritys-adminHeader,
.cc-authoritys-memberHeader {
  gap: 10px;
}

.cc-classes-classlist {
  padding: 10px;
}

.cc-classitem {
  height: 100px;
  width: 100px;
  background: #77729f;
  border-radius: 50%;
}
</style>

<template>
  <profile />
  <div class="body">
    <div class="article-main">
      <div class="article-view">
        <LogoHeader />
        <div class="write-container">
          <div class="wirte-inner-bg">
            <InclassHeader :item="classStore.selectedClass!" />
            <div class="write-wrapper">
              <div v-if="editor" class="write-wrap">
                <div>
                  <select class="write-select" id="my-dropdown" v-model="selectedCategory.name">
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.name"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <input type="text" class="write-title" placeholder=" 제목" />
                <div class="control-group">
                  <div class="formatting-controls">
                    <div>
                      <select v-model="fontSize" @change="applyFontSize">
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="24">24</option>
                        <option value="28">28</option>
                        <option value="30">30</option>
                        <option value="36">36</option>
                        <option value="50">50</option>
                        <option value="72">72</option>
                        <option value="96">96</option>
                      </select>
                    </div>

                    <div>
                      <select v-model="textColor" @change="applyTextColor">
                        <option value="red">빨간색</option>
                        <option value="orange">주황색</option>
                        <option value="yellow">노랑색</option>
                        <option value="green">녹색</option>
                        <option value="blue">파란색</option>
                        <option value="indigo">남색</option>
                        <option value="violet">보라색</option>
                        <option value="black">검정색</option>
                        <option value="white">하얀색</option>
                      </select>
                    </div>

                    <div>
                      <select v-model="bgColor" @change="applyBackgroundColor" placeholder="배경색">
                        <option value="yellow">노랑색</option>
                        <option value="lightblue">하늘색</option>
                        <option value="lightgreen">연두색</option>
                        <option value="pink">핑크색</option>
                        <option value="black">검정색</option>
                        <option value="black">하얀색</option>
                      </select>
                    </div>

                    <div>
                      <button
                        @click="handleFormat('bold')"
                        style="font-weight: 600"
                        :class="{ 'is-active': editor && editor.isActive('bold') }"
                      >
                        B
                      </button>
                    </div>

                    <div>
                      <button
                        @click="handleFormat('italic')"
                        style="font-style: italic"
                        :class="{ 'is-active': editor && editor.isActive('italic') }"
                      >
                        i
                      </button>
                    </div>

                    <div>
                      <button
                        @click="handleFormat('strike')"
                        :class="{ 'is-active': editor && editor.isActive('strike') }"
                      >
                        <span class="button-strike">취소선</span>
                      </button>
                    </div>
                    <div><button @click="applyList('bullet')">•</button></div>

                    <div><button @click="applyList('ordered')">번호 매기기</button></div>

                    <div><button @click="handleFormat('clear')">서식 제거</button></div>

                    <!-- <select v-model="headingLevel" @change="applyHeading">
                      <option value="">-- Heading --</option>
                      <option value="1">H1</option>
                      <option value="2">H2</option>
                      <option value="3">H3</option>
                      <option value="4">H4</option>
                      <option value="5">H5</option>
                      <option value="6">H6</option>
                    </select> -->
                    <!-- <button
                      @click="handleFormat('code')"
                      :class="{ 'is-active': editor && editor.isActive('code') }"
                    >
                      Code
                    </button> -->

                    <!-- 코드 블록 -->
                    <!-- <button @click="applyCodeBlock">CodeBlock</button> -->

                    <div class="undo-redo-group">
                      <button @click="handleUndo">↶</button>
                      <button @click="handleRedo">↷</button>
                    </div>
                  </div>
                  <editor-content class="type-place" :editor="typedEditor" />
                </div>
                <div class="save-cancle">
                  <div class="write-cancle">
                    <router-link
                      class="cancle-btn"
                      :to="{
                        name: '',
                        params: {},
                      }"
                    >
                      취소
                    </router-link>
                  </div>
                  <div class="write-save">
                    <router-link
                      class="save-btn"
                      :to="{
                        name: '',
                        params: {},
                      }"
                    >
                      작성
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <InClass :item="1" /> -->
    </div>
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import LogoHeader from '@/components/LogoHeader.vue'
import Profile from '@/components/profile.vue'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Navbar from '@/components/Navbar.vue'
import InclassHeader from '@/components/InclassHeader.vue'
import { useClassStore } from '@/stores/communityStore'
import InClass from '@/components/Classes/InClass.vue'

const classStore = useClassStore()
const categories = classStore.categories
const selectedCategory = ref(categories[0])
console.log('categories', categories)
const editor = ref<Editor | null>(null)
const typedEditor = computed(() => editor.value as Editor)

const props = defineProps<{ classId: string }>()

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          return attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {}
        },
      },
    }
  },
})

editor.value = new Editor({
  extensions: [StarterKit, Color, CustomTextStyle, Highlight.configure({ multicolor: true })],
  content: `<p>초기 콘텐츠입니다.</p>`,
})

// 각 select의 선택 상태를 관리하는 ref들
const inlineFormat = ref('')
const headingLevel = ref('')
const listType = ref('')
const codeBlock = ref('')
const textColor = ref('white')
const bgColor = ref('black')
const fontSize = ref('16')

const handleFormat = (action: string) => {
  if (!editor.value) return

  switch (action) {
    case 'bold':
      editor.value.chain().focus().toggleBold().run()
      break
    case 'italic':
      editor.value.chain().focus().toggleItalic().run()
      break
    case 'strike':
      editor.value.chain().focus().toggleStrike().run()
      break
    case 'code':
      editor.value.chain().focus().toggleCode().run()
      break
    case 'clear':
      editor.value.chain().focus().unsetAllMarks().run()
      break
    default:
      break
  }
}

// const applyHeading = () => {
//   if (!editor.value) return
//   const level = Number(headingLevel.value) as 1 | 2 | 3 | 4 | 5 | 6
//   editor.value.chain().focus().toggleHeading({ level }).run()
// }

const applyFontSize = () => {
  console.log('applyFontSize called, size:', fontSize.value)
  if (!editor.value) return
  const sizeWithPx = fontSize.value + 'px'
  editor.value.chain().focus().setMark('textStyle', { fontSize: sizeWithPx }).run()
}

const applyList = (type: 'bullet' | 'ordered') => {
  if (!editor.value) return
  if (type === 'bullet') {
    editor.value.chain().focus().toggleBulletList().run()
  } else if (type === 'ordered') {
    editor.value.chain().focus().toggleOrderedList().run()
  }
}

const applyCodeBlock = () => {
  if (!editor.value) return
  editor.value.chain().focus().toggleCodeBlock().run()
}

const applyTextColor = () => {
  if (!editor.value) return
  if (textColor.value === '') {
    // 색상이 비어 있으면 기존 색상 제거
    editor.value.chain().focus().unsetMark('textStyle').run()
  } else {
    editor.value.chain().focus().setColor(textColor.value).run()
  }
}

// 배경색 적용 함수
const applyBackgroundColor = () => {
  if (!editor.value) return
  if (bgColor.value === '') {
    ;(editor.value.chain() as any).unsetHighlight().run()
  } else {
    ;(editor.value.chain() as any).toggleHighlight({ color: bgColor.value }).run()
  }
}

const handleUndo = () => {
  if (!editor.value) return
  editor.value.chain().focus().undo().run()
}

const handleRedo = () => {
  if (!editor.value) return
  editor.value.chain().focus().redo().run()
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss">
.write-container {
  background: #26232d;
  width: 1100px;
  padding: 25px;
  border-radius: 10px;
}

.wirte-inner-bg {
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
  background: rgb(32, 32, 32);
  color: #cecece;
}

.write-wrap {
  padding: 15px;
  border-radius: 10px;
  color: #d3d3d3;
}

.write-select,
.write-title {
  background: transparent;
  font-weight: bold;
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: 0.4em 1em;
  border: 2px solid;
  border-color: #77729f;
  border-radius: 3px;
  color: #cecece;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.write-select:focus,
.write-title:focus {
  outline: none;
  border-color: #f2c53d !important;
}

.write-select {
  appearance: none;
  --select-arrow-svg: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDExIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGgKICAgIGQ9Ik00LjU3OTk1IDguMTA5NTNDNC45OTY0NCA4LjYzMDE2IDUuNjcyODIgOC42MzAxNiA2LjA4OTMyIDguMTA5NTNMMTAuMzU0MiAyLjc3ODI4QzEwLjY2MDcgMi4zOTUwOSAxMC43NTA3IDEuODI0NDggMTAuNTg0MSAxLjMyNDY4QzEwLjQxNzUgMC44MjQ4NzMgMTAuMDMxIDAuNSA5LjU5Nzg1IDAuNUwxLjA2ODA4IDAuNTA0MTY1QzAuNjM4MjU2IDAuNTA0MTY1IDAuMjQ4NDE5IDAuODI5MDM5IDAuMDgxODIxNSAxLjMyODg0Qy0wLjA4NDc3NTcgMS44Mjg2NSAwLjAwODUxODc3IDIuMzk5MjYgMC4zMTE3MjYgMi43ODI0NEw0LjU3NjYxIDguMTEzNjlMNC41Nzk5NSA4LjEwOTUzWiIKICAgIGZpbGw9IiM5Mjk4QUMiIC8+Cjwvc3ZnPg==);
}

.write-select option {
  background-color: #26232d;
}

.type-place {
  background: #ffffff;
  border-radius: 0 0 10px 10px;
}

.type-place .ProseMirror:focus,
input:focus {
  outline: none;
  border: none;
}

.type-place .ProseMirror {
  min-height: 500px;
  caret-color: black;
  padding: 10px;
  color: black;
}

// .control-group {
//   border: 3px solid;
//   border-color: #77729f;
//   border-radius: 10px;
// }

.formatting-controls {
  border: 2px solid;
  border-color: #77729f;
  background: #2e2e40;
  border-radius: 10px 10px 0 0;
  display: flex;
}

.formatting-controls * {
  background-color: transparent;
  border: none;
  color: #cecece;
  text-align: center;
  font-size: 16px;
}

.formatting-controls div {
  height: 50px;
  border-right: solid 2px;
  display: flex;
  padding: 0 10px;
}

.formatting-controls div *:hover {
  cursor: pointer;
}

.formatting-controls div select option {
  background-color: #1e1e1e;
  color: white;
  border: none;
}

.formatting-controls div select:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

.button-strike {
  text-decoration: line-through;
}

.formatting-controls .undo-redo-group {
  border-right: none;
  display: flex;
  margin-left: auto;
  gap: 8px;
}

.undo-redo-group button {
  padding-top: 10px;
  font-size: 30px;
}

.save-cancle {
  display: flex;
  justify-content: flex-end;
}

.write-save,
.write-cancle {
  padding: 15px 0 0 15px;
}

.save-btn {
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

.cancle-btn {
  padding: 12px 24px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  border: 1px solid #77729f;
  color: #d3d3d3;
}

.save-btn:hover {
  background-color: #77729f;
}
.cancle-btn:hover {
  background-color: transparent;
}

/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: #1e1e1e;
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>

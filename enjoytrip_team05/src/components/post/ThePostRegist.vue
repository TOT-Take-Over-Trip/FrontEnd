<script setup>
import { ref } from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";

//quill editor
const state = ref({
    content: '<p></p>',
    _content: '',
    editorOption: {
        placeholder: '내용을 입력하세요',
        modules: {
          toolbar: [
              [],[],[],[],[],[],[],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ align: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['image']
          ],
          imageResize: {
          },
        },
        disabled: false
    }
}
)

const onEditorBlur = (quill) => {
    console.log('editor blur!', quill)
}
const onEditorFocus = (quill) => {
    console.log('editor focus!', quill)
}
const onEditorReady = (quill) => {
    console.log('editor ready!', quill)
}
const onEditorChange = ({ quill, html, text }) => {
    console.log('editor change!', quill, html, text)
    state._content = html
}

//글 등록, 등록 후 router를 통한 이동
const title = ref('');
const router = useRouter();

const regist = () => {
  const postDto = {
    memberId:1, //TODO: 현재 로그인한 유저로 바꿔주기
    title:title.value,
    content:state.value.content
  }
  const url = "http://localhost:8080/tot/posts/new";
  axios.post(url,postDto).then(() => {
    console.log("게시글 등록 성공");
    router.push('/'); //TODO: 이동 경로 설정
  });
}

</script>

<template>
  <div class="container mx-auto">
    <input class="title-input" placeholder="제목을 입력하세요" v-model="title"/>
    <div class="editor-container">
      <quill-editor
          v-model:value="state.content"
          :options="state.editorOption"
          :disabled="state.disabled"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)"
      />
    </div>
    <!-- 버튼 그룹 추가 -->
    <div class="button-group">
      <button @click="regist">글등록</button>
      <button>임시저장</button>
      <button>취소</button>
    </div>
  </div>
</template>

<style scoped>

.ql-container {
  min-height: 600px;
  height: auto;
    border-left: none !important;
    border-right: none !important;
}

.container {
  max-width: 80%;
  /* margin: 0 auto; */
}

.title-input {
  display: block;
  width: calc(100% - 2px);
  border: none;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
  padding: 10px 0;
  text-align: center;
  font-size: 20px;
  background-color: transparent;
  outline: none;
}

.editor-container {
  max-width: 100%;
  margin: 0 auto;
}

/* 버튼 그룹 스타일링 */
.button-group {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  margin: 20px 0; /* 에디터와의 상하 마진 조정 */
}

.button-group button {
  margin: 0 10px; /* 버튼 사이의 간격 */
  padding: 10px 20px; /* 버튼 내부 패딩 */
  font-size: 16px; /* 텍스트 크기 */
  background-color: #f5f5f5; /* 배경 색상 */
  border: 1px solid #ddd; /* 테두리 스타일 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
}

/* 버튼 호버 효과 */
.button-group button:hover {
  background-color: #e9e9e9;
}
</style>




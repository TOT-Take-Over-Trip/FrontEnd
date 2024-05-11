<script setup>
import { reactive } from 'vue'

const state = reactive({
    content: '<p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>',
    _content: '',
    editorOption: {
        placeholder: 'core',
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

</script>

<template>
  <div class="container">
    <input class="title-input" placeholder="제목을 입력하세요" />
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
      <button>글등록</button>
      <button>임시저장</button>
      <button>취소</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
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




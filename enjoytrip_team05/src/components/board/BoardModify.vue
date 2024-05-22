<script setup>
import { ref, onMounted } from 'vue'
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const route = useRoute();

const post = ref({});
onMounted(async () => {
  try {
    const response = await axios.get(`${URL}/posts/${route.params.postId}?memberId=${memberId}`);
    console.log(response.data);
    post.value = response.data.postResponseDto;
    post.value.createdDate = post.value.createdDate.split(' ')[0];
    post.value.updatedDate = post.value.updatedDate.split(' ')[0];
    state.value.content = post.value.content;  // 컨텐츠를 상태에 설정
    title.value = post.value.title;

    console.log("post: ", post.value);
  } catch (error) {
    console.error("Single Post error: ", error);
  }
  console.log(post.value);
});

//quill editor
const state = ref({
  content: '',
  _content: '',
  editorOption: {
    placeholder: '내용을 입력하세요',
    modules: {
      toolbar: [
        [], [], [], [], [], [], [],
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
      imageResize: {},
    },
    disabled: false
  }
});

const onEditorBlur = (quill) => {
  console.log('editor blur!', quill)
}
const onEditorFocus = (quill) => {
  console.log('editor focus!', quill)
}
const onEditorReady = (quill) => {
  console.log('editor ready!', quill);
  quill.setContents(quill.clipboard.convert(state.value.content));  // HTML 컨텐츠를 설정
}
const onEditorChange = ({ quill, html, text }) => {
  console.log('editor change!', quill, html, text);
  state.value._content = html;
}

//썸네일 등록
const thumbnail = ref(null); // 썸네일 이미지 데이터를 저장할 ref 생성

const onFileChange = (e) => {
  const file = e.target.files[0]; // 선택된 파일 가져오기
  console.log(file)
  if (!file) {
    return;
  }
  thumbnail.value = file // 파일로부터 URL 생성
};

//글 등록, 등록 후 router를 통한 이동
const title = ref('');
const router = useRouter();
const URL = import.meta.env.VITE_BASE_URL;
const token = sessionStorage.getItem("accessToken");
const decodeToken = jwtDecode(token);
const memberName = decodeToken.sub;
const memberId = sessionStorage.getItem("memberId");

const regist = () => {
  const formData = new FormData();  //타입 명시를 위한 form데이터 생성
  const postDto = JSON.stringify({
    postId:post.value.postId,
    memberId: memberId,
    title: title.value,
    content: state.value.content,
    memberName: memberName,
  });
  formData.append("postDto", new Blob([postDto], { type: "application/json" }));
  if (thumbnail.value) {
    formData.append("thumbnail", thumbnail.value);
  }
  const postId = post.value.postId;
  const url = `${URL}/posts/${postId}`;
  axios.put(url, formData).then(() => {
    console.log("게시글 업데이트 성공");
    router.push({ name: 'board' }); //TODO: 이동 경로 설정
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
          @blur="onEditorBlur"
          @focus="onEditorFocus"
          @ready="onEditorReady"
          @change="onEditorChange"
      />
    </div>
    <!-- 썸네일 등록 -->
    <div class="thumbnail-upload">
      <input type="file" @change="onFileChange" accept="image/*"/>
      <div v-if="thumbnail" class="thumbnail-preview">
        <img :src="thumbnail" alt="Thumbnail preview"/>
      </div>
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

.thumbnail-upload {
  margin: 20px 0;
}

.thumbnail-preview img {
  width: 100%;
  max-width: 200px; /* 미리보기 이미지 크기 조절 */
  height: auto;
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




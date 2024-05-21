import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps/@utils';


import App from './App.vue'
import router from './router'

//quill
import { quillEditor, Quill } from 'vue3-quill'
import ImageResize from 'quill-image-resize-vue';
Quill.register('modules/imageResize', ImageResize)

//kakao map
useKakao('f2cdf70783011fb83abc98acb3f2bc22');

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(quillEditor)

app.mount('#app')

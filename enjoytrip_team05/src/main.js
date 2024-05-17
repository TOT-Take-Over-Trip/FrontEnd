import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//quill
import { quillEditor, Quill } from 'vue3-quill'
import ImageResize from 'quill-image-resize-vue';
Quill.register('modules/imageResize', ImageResize)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(quillEditor)

app.mount('#app')

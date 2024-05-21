<script setup>
import axios from 'axios';
import {computed, onMounted, ref} from "vue";
import { KakaoMap, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};

const URL = import.meta.env.VITE_BASE_URL;

const course = ref({})
onMounted(async () => {
  await axios.get(`${URL}/courses/6?memberId=2`)
  .then((response) => {
    console.log(response.data);
    course.value = response.data;
    console.log(course.value.coursePlaces);
  })
  .catch((error) => {
    console.error("Single course error: ", error);
  })
})


</script>

<template>
  <div class="flex w-4/12">

  </div>

  <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
    <kakao-map-marker v-for="(courplace, index) in course.coursePlaces"
                      :key="course.coursePlaces.coursePlaceId"
                      :lat="courplace.place.latitude" :lng="courplace.place.longitude" :draggable="true">
    </kakao-map-marker>
    <KakaoMapCustomOverlay v-for="(courseplace, index) in course.coursePlaces"
                           :key="courseplace.coursePlaceId"
                           :lat="courseplace.place.latitude" :lng="courseplace.place.longitude" :draggable="true">
      <div
          style="
          padding: 10px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        "
      >
        <div style="font-weight: bold; margin-bottom: 5px">{{courseplace.place.name}}</div>
        <div style="display: flex">
          <div style="margin-right: 10px">
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-start">
<!--            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">courseplace.place.name</div>-->
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{courseplace.place.address}}</div>
<!--            <div><a href="https://www.kakaocorp.com/main" target="_blank" style="color: blue">홈페이지</a></div>-->
          </div>
        </div>
      </div>
    </KakaoMapCustomOverlay>

  </KakaoMap>
</template>
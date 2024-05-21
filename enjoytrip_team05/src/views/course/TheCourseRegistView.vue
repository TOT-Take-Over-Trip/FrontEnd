<script setup>
import axios from 'axios';
import {computed, onMounted, ref} from "vue";
import { KakaoMap, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps';
import draggable from "vuedraggable";
import VButton from "@/components/VButton.vue";


const markerList = ref([]);
const onLoadKakaoMap = (mapRef) => {

  map.value = mapRef;
};
// 검색 키워드

const searchContent = ref('')
const searchCondition = ref('제목')
const searchedData = ref({});
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};

const URL = import.meta.env.VITE_BASE_URL;

const course = ref({})
const coursePlaces = ref([]);

const map = ref();


// 키워드로 장소를 검색합니다
const searchPlace = () => {
  searchedData.value = {};
  markerList.value = [];
  axios.get(`${URL}/places?keyword=${searchContent.value}`)
      .then((response) => {
        console.log(response.data)
        searchedData.value = response.data;
        const bounds = new kakao.maps.LatLngBounds();

        for (let marker of searchedData.value) {
          const markerItem = {
            lat: marker.latitude,
            lng: marker.longitude,
            infoWindow: {
              content: marker.name,
              visible: false
            }
          };
          markerList.value.push(markerItem);
          bounds.extend(new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude)));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.value?.setBounds(bounds);
      })
}

const onClickMapMarker = (marker) => {
  marker.infoWindow.visible = !marker.infoWindow.visible;
}


function removeQuotesFromPlaceFields(arr) {
  return arr.map(item => {
    // place 객체가 존재하는지 확인
    if (item.place) {
      // 따옴표를 제거한 name과 address 필드 생성
      item.place.name = item.place.name.replace(/"/g, '');
      item.place.address = item.place.address.replace(/"/g, '');
    }
    return item;
  });
}

onMounted(async () => {
  await axios.get(`${URL}/courses/6?memberId=2`)
  .then((response) => {
    // console.log(response.data);
    course.value = response.data;
    coursePlaces.value = course.value.coursePlaces.map(coursePlace => {
      return {
        ...coursePlace,
        show: false,
      };
    });
    removeQuotesFromPlaceFields(coursePlaces.value)
  })
  .catch((error) => {
    console.error("Single course error: ", error);
  })
})

// 마커 전용
const coursePlaceMarker = computed(() => {
  return coursePlaces.value;
});

const printList = () => {
  // for (let i = 0; i < coursePlaces.value.length; i++) {
  //   console.log(coursePlaces.value[i].place.name);
  // }
  console.log(coursePlaces.value)
}

const movePointer = (coursePlace) => {
  const place = coursePlace.place;
  // map.value = mapRef;
  let bounds = new kakao.maps.LatLngBounds();
  let point;

  point = new kakao.maps.LatLng(place.latitude, place.longitude);
  bounds.extend(point);

  map.value.setBounds(bounds);
}

// 삭제 버튼 누르면 리스트 내에서 item 삭제하기
const removeItem = (element) => {
  coursePlaces.value = coursePlaces.value.filter(item => item.coursePlaceId !== element.coursePlaceId);
}

// 마커 누르면 오버레이 생성하는 함수
const showOverlay = (coursePlace) => {
  coursePlace.show = !coursePlace.show;
}


</script>

<template>
  <div class="search-container">
    <!--      <SearchComponent :posts="posts" />-->
    <div class="flex justify-around items-center w-full ">
      <!--  검색 + 검색아이콘 + 필터 + 글쓰기 -->
      <div class="flex items-center justify-center w-2/3 h-24">
        <input type="text" class="text-xl border-2" style="width: 50%; height: 45%" placeholder="검색할 내용을 입력해주세요." v-model="searchContent">
        <img src="/src/assets/img/searchIcon.png" @click="searchPlace" class="mx-3" style="height: 49%" alt="searchIcon" />
      </div>
    </div>
  </div>
  <div class="flex">
    <div class="w-4/12">
      <!-- v-model로 데이터 배열 상태로 저장 -->
      <draggable v-model="coursePlaces" itemKey="id" class="list-group" @update="printList">
        <template #item="{ element }">
          <div
              class="draggable-item shadow-lg flex h-28 items-center justify-between text-3xl my-2 mx-2 rounded-xl bg-sky-50">
            <div class="flex flex-col" @click="movePointer(element)" >
              <div class="my-2">{{ element.place.name }}</div>
              <div class="text-sm my-2">{{ element.content }}</div>
            </div>
            <VButton class="text-xl" @click="removeItem(element)">삭제</VButton>
          </div>
        </template>
      </draggable>
    </div>
    <div class="w-8/12">
      <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" @onLoadKakaoMap="onLoadKakaoMap" :draggable="true" style="width: 100%; height: 100vh;">
        <!--   마커 등록     -->
        <kakao-map-marker v-for="(coursePlace, index) in coursePlaceMarker"
                          @onClickKakaoMapMarker="showOverlay(coursePlace)"
                          :key="course.coursePlaces.coursePlaceId"
                          :lat="coursePlace.place.latitude" :lng="coursePlace.place.longitude" :draggable="false" :clickable="true">
        </kakao-map-marker>
        <kakao-map-marker :lat="coordinate.lat" :lng="coordinate.lng"></kakao-map-marker>

        <!--   마커 클릭 시 설명 카드 등장하도록     -->
        <KakaoMapCustomOverlay v-for="(coursePlace, index) in coursePlaceMarker"
                               :key="coursePlace.coursePlaceId"
                               :lat="coursePlace.place.latitude" :lng="coursePlace.place.longitude" :draggable="true">
          <div v-if="coursePlace.show === true">
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
              <div style="font-weight: bold; margin-bottom: 5px">{{coursePlace.place.name}}</div>
              <div style="display: flex">
                <div style="margin-right: 10px">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" />
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-start">
                  <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{coursePlace.place.address}}</div>
                </div>
              </div>
            </div>
          </div>
        </KakaoMapCustomOverlay>

        <KakaoMapMarker
            v-for="(marker, index) in markerList"
            :key="marker.key === undefined ? index : marker.key"
            :lat="marker.lat"
            :lng="marker.lng"
            :infoWindow="marker.infoWindow"
            :clickable="true"
            @onClickKakaoMapMarker="onClickMapMarker(marker)"
        />
      </KakaoMap>
    </div>
  </div>

</template>
<style>
/* 스타일을 필요에 맞게 조정하세요 */
.draggable-item {
  padding: 10px;
  border: 1px solid #ddd;
  cursor: move;
}
</style>

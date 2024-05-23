<script setup>
import axios from 'axios';
import {computed, onMounted, ref} from "vue";
import {KakaoMap, KakaoMapMarker, KakaoMapCustomOverlay, KakaoMapMarkerPolyline} from 'vue3-kakao-maps';
import draggable from "vuedraggable";
import VButton from "@/components/VButton.vue";
import {jwtDecode} from "jwt-decode";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const markerList = ref([]);
const token = sessionStorage.getItem("accessToken");
const decodeToken = jwtDecode(token);
const loginId = decodeToken.sub;
const memberId = sessionStorage.getItem("memberId");

const clickRegisterBtn = ref(false);
const clickedCoursePlace = ref({});
// 동적으로 화면 크기 변경을 위한 computed 변수
const mapWidth = computed(() => {
  if (clickRegisterBtn.value === false)
    return "w-9/12";
  return "w-6/12";
});

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
};
// 검색 키워드
const searchContent = ref('')
const searchedData = ref({});
const coordinate = ref({
  // TODO: 현재 위치 지정하는게 제일 좋을듯
  lat: 37.566826,
  lng: 126.9786567
});

// project base url
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
        searchedData.value = response.data;
        const bounds = new kakao.maps.LatLngBounds();

        for (let marker of searchedData.value) {
          const markerItem = {
            lat: marker.latitude,
            lng: marker.longitude,
            infoWindow: {
              address: marker.address,
              content: marker.content,      // 정말 자세한 내용
              createdDate: marker.createdDate,
              gugunCode: marker.gugunCode,
              name: marker.name,
              placeId: marker.placeId,
              sidoCode: marker.sidoCode,
              status: marker.status,
              image: marker.thumbnail,
              updatedDate: marker.updatedDate,
              visible: false
            }
          };
          markerList.value.push(markerItem);
          bounds.extend(new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude)));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.value?.setBounds(bounds);
      })
  let bounds;
  markerList.value.forEach((markerInfo) => {
    let point = new kakao.maps.LatLng(markerInfo.lat, markerInfo.lng);
    let marker = new kakao.maps.Marker({position: point})
    if (map.value !== undefined) {
      marker.setMap(map.value);
    }
    bounds.extend(point)
  })

  // if (map.value !== undefined) {
  //   map.value.setBounds(bounds);
  // }
}

const onClickMapMarker = (marker) => {
  marker.infoWindow.visible = !marker.infoWindow.visible;
}

const latLngList = computed(() => {
  const latlng = ref([]);
  for (let marker of coursePlaces.value) {
    const markerItem = {
      lat: marker.place.latitude,
      lng: marker.place.longitude,
    }
    latlng.value.push(markerItem);
  }
  return latlng.value;
})

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


// 마커 전용
const coursePlaceMarker = computed(() => {
  return coursePlaces.value;
});


// 왼쪽 리스트 카드를 누르면 해당 위치로 focus 이동
const movePointer = (coursePlace) => {
  console.log("coursePlace: ", coursePlace);
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

// 코스 업데이트하고 서버에 요청
const updateCourse = () => {
  const data = {
    "memberId": memberId,
    "title": course.value.title,
    "content": course.value.content,
    "coursePlaces": [],
  }
  let seq = 1;
  for (let coursePlace of coursePlaces.value) {
    console.log("coursePlace: ", coursePlace);
    const coursePlaceData = {
      "placeId": coursePlace.placeId,
      "content": coursePlace.content,
      "sequence": seq++,
    }
    data.coursePlaces.push(coursePlaceData);
  }

  axios.put(`${URL}/courses/${route.params.courseId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  router.replace({name: "course"});
}

// 코스 삭제하기
const deleteCourse = () => {

  axios.post(`${URL}/courses/delete/${route.params.courseId}`);
  router.replace({name: "course"});
}

const registCoursePlace = () => {
  clickRegisterBtn.value = false;
  for (let marker of markerList.value) {
    marker.infoWindow.visible = false;
  }
  coursePlaces.value.push(clickedCoursePlace.value);
}
const cancelRegist = () => {
  clickRegisterBtn.value = false;
}

const addCourse = (marker) => {
  clickRegisterBtn.value = true;
  // 제일 마지막 coursePlaceId 찾기
  let coursePlaceId = 0;
  for (let course of coursePlaces.value) {
    if (coursePlaceId < course.coursePlaceId)
      coursePlaceId = course.coursePlaceId;
  }
  clickedCoursePlace.value = {
    place: {
      address: marker.infoWindow.address,
      content: marker.infoWindow.content,
      createdDate: marker.infoWindow.createdDate,
      gugunCode: marker.infoWindow.gugunCode,
      sidoCode: marker.infoWindow.sidoCode,
      status: marker.infoWindow.status,
      thumbnail: marker.infoWindow.image,
      latitude: marker.lat,
      longitude: marker.lng,
      name: marker.infoWindow.name,
      placeId: marker.infoWindow.placeId,
      updatedDate: marker.infoWindow.updatedDate,
    },
    coursePlaceId: ++coursePlaceId,
    content: "",
    courseId: coursePlaces.value[0].courseId,     // TODO: props 로 courseId 받아와서 대체 해야됨
    placeId: marker.infoWindow.placeId,
    sequence: coursePlaces.value.length,
    show: false,
    status: "active",
    updatedDate: marker.infoWindow.updatedDate,
    createdDate: marker.infoWindow.createdDate,
  };
}

// 코스 등록창 관련 내용
const showFullContent = ref(false);

const toggleContent = () => {
  showFullContent.value = !showFullContent.value;
};

const truncatedContent = computed(() => {
  const content = clickedCoursePlace.value.place.content;
  return content.length > 100 ? content.substring(0, 100) + '...' : content;
});

const updateTitle = (event) => {
  course.value.title = event.target.innerText;
}


onMounted(async () => {
  await axios.get(`${URL}/courses/${route.params.courseId}?memberId=${memberId}`)
      .then((response) => {
        course.value = response.data;
        console.log("course:", course.value.memberId);
        console.log("memberId:", memberId);
        coordinate.value.lat = course.value.coursePlaces[0].place.latitude;
        coordinate.value.lng = course.value.coursePlaces[0].place.longitude;
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

const userPoint = ref(0);
const takeOver = async () =>{
  await axios.get(`${URL}/members/${memberId}`).then((response)=>{
    userPoint.value = response.data.point;
  })
  console.log("구매자 포인트", userPoint.value)
  console.log("인수에 필요한 포인트", coursePrice.value);

  if(coursePrice.value<=userPoint.value) {
    await axios.post(`${URL}/courses/takeover/${route.params.courseId}?memberId=${memberId}`).then(
        (response) => {
          router.push({name: 'myCourse'})
        })
    console.log("인수 성공!!")
  }
  else{
    alert("point가 부족합니다.")
  }
}

const coursePrice = computed( () =>{
  const likeCount = course.value.courseLikeCount;
  const hit = course.value.hit;
  return (likeCount*10+hit);
})
</script>

<template>
  <div class="flex justify-center my-3">
    <div v-if="memberId == course.memberId" class="text-4xl" @input="updateTitle" contenteditable="true"
         style="display: inline-block;">{{ course.title }}
    </div>
    <div v-else class="text-4xl" style="display: inline-block;">{{ course.title }}</div>
  </div>

  <div class="search-container">
    <!--      <SearchComponent :posts="posts" />-->
    <div class="flex justify-around items-center w-full ">
      <!--  검색 + 검색아이콘 + 필터 + 글쓰기 -->
      <div class="flex items-center justify-center w-2/3 h-24">
        <input type="text" class="text-xl border-2 p-2" style="width: 50%; height: 45%" placeholder="검색할 내용을 입력해주세요."
               v-model="searchContent" @keydown.enter="searchPlace">
        <img src="/src/assets/img/searchIcon.png" @click="searchPlace" class="mx-3" style="height: 49%"
             alt="searchIcon"/>
        <VButton class="me-4" v-if="memberId == course.memberId" @click="updateCourse">등록</VButton>
        <button v-if="memberId == course.memberId" class="bg-transparent hover:bg-red-400 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded" @click="deleteCourse">삭제</button>
      </div>
    </div>
  </div>
  <div class="flex">
    <div class="w-3/12 flex flex-col">
      <div class="mx-2 h-12">
        <input class="px-2" v-model="course.content" style="width: 100%; height: 100%;" type="text"
               placeholder="코스의 설명을 간단하게 작성해주세요."/>
      </div>
      <div class="border-2 mx-1 rounded-xl shadow-inner">
        <!-- v-model로 데이터 배열 상태로 저장 -->
        <draggable v-model="coursePlaces" itemKey="id" class="list-group">
          <template #item="{ element }">
            <div
                class="draggable-item shadow-lg flex h-28 items-center justify-between text-2xl my-2 mx-2 rounded-xl bg-sky-50">
              <div class="flex flex-col" @click="movePointer(element)">
                <div class="my-2">{{ element.place.name }}</div>
                <div class="text-sm my-2">{{ element.content }}</div>
              </div>
              <VButton v-if="memberId == course.memberId" class="text-xl" @click="removeItem(element)">삭제</VButton>
            </div>
          </template>
        </draggable>
      <!--인수버튼 START-->
      </div>
      <VButton v-if="memberId != course.memberId" class="text-xl h-28" @click="takeOver">{{coursePrice.toLocaleString()}}P로 인수하기</VButton>
    </div>
    <!--인수버튼 END-->
    <div :class=mapWidth>
      <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" @onLoadKakaoMap="onLoadKakaoMap" :draggable="true"
                style="width: 100%; height: 100vh;">
        <!--   poly line 등록     -->
        <KakaoMapMarkerPolyline :markerList="latLngList" :showMarkerOrder="true" :endArrow="true"/>
        <!--   마커 등록     -->
        <KakaoMapMarker v-for="(coursePlace, index) in coursePlaceMarker"
                        @onClickKakaoMapMarker="showOverlay(coursePlace)"
                        :key="course.coursePlaces.coursePlaceId"
                        :lat="coursePlace.place.latitude" :lng="coursePlace.place.longitude" :draggable="false"
                        :clickable="true">
        </KakaoMapMarker>

        <!-- 왼쪽에 작성 중인 코스의 마커 클릭 시 설명 카드 등장하도록     -->
        <KakaoMapCustomOverlay v-for="(coursePlace, index) in coursePlaceMarker"
                               :key="coursePlace.coursePlaceId"
                               :yAnchor="1.4"
                               :lat="coursePlace.place.latitude" :lng="coursePlace.place.longitude" :draggable="true">
          <div v-if="coursePlace.show === true">
            <div
                style="
                  width: 30rem;
                  height: 16rem;
                  padding: 10px;
                  background-color: white;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                "
            >
              <div class="font-bold mb-2 text-2xl">{{ coursePlace.place.name }}</div>
              <div class="flex justify-center" style="width: 100%;">
                <img :src="coursePlace.place.thumbnail" style="height: 10rem; width: 100%;"/>

              </div>
              <div class="flex justify-center items-center mt-3" style="width: 100%;">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                  {{ coursePlace.place.address }}
                </div>
              </div>
            </div>
          </div>
        </KakaoMapCustomOverlay>

        <!--  검색하면 나오는 마커들      -->
        <KakaoMapMarker
            v-for="(marker, index) in markerList"
            :key="marker.key === undefined ? index : marker.key"
            :lat="marker.lat"
            :lng="marker.lng"
            :clickable="true"
            @onClickKakaoMapMarker="onClickMapMarker(marker)"
        >
        </KakaoMapMarker>

        <!--   마커 클릭 시 설명 카드 등장하도록     -->
        <KakaoMapCustomOverlay v-for="(marker, index) in markerList"
                               :key="marker.key === undefined ? index : marker.key"
                               :lat="marker.lat" :lng="marker.lng" :infoWindow="marker.infoWindow"
                               :yAnchor="3"
                               :draggable="true" :clickable="true"
        >
          <div v-if="marker.infoWindow.visible === true"
               class="flex flex-col items-start justify-evenly"
               style="width: 30rem; height: 16rem; padding: 10px; background-color: white; border: 1px solid #ccc; border-radius: 5px;">
            <div class="font-bold mb-2 text-2xl">
              {{ marker.infoWindow.name }}
            </div>
            <div class="flex justify-center" style="height: 50%;">
              <img :src="marker.infoWindow.image" style="width: 100%;"/>
            </div>
            <div class="flex justify-center items-center mt-3" style="width: 100%;">
              <div>{{ marker.infoWindow.address }}</div>
              <VButton v-if="memberId == course.memberId" class="ms-4 text-sm" @click="addCourse(marker)">등록</VButton>
            </div>
          </div>
        </KakaoMapCustomOverlay>
      </KakaoMap>
    </div>
    <div v-if="clickRegisterBtn === true" class="w-3/12 relative">
      <!-- 배경 이미지 -->
      <div :style="{ backgroundImage: `url(${clickedCoursePlace.place.thumbnail})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'blur(5px)', position: 'absolute',
                    top: 0, right: 0, bottom: 0, left: 0, zIndex: -1}">
      </div>
      <!-- 텍스트 내용 -->
      <div class="z-10 p-4">
        <!-- place 이름 -->
        <div class="text-3xl my-3 flex justify-center">{{ clickedCoursePlace.place.name }}</div>
        <!-- place 설명 -->
        <div class="my-4 px-2 py-2 text-xl bg-white bg-opacity-75 rounded-md">
          <span v-if="showFullContent">{{ clickedCoursePlace.place.content }}</span>
          <span v-else>{{ truncatedContent }}</span>
          <div class="text-end">
            <button v-if="!showFullContent" @click="toggleContent" class="text-blue-500 underline">자세히 보기</button>
            <button v-else @click="toggleContent" class="text-blue-500 underline">간략히 보기</button>
          </div>
        </div>
        <!-- coursePlace content 작성 -->
        <textarea class="rounded-md my-3 w-full" maxlength="30" v-model="clickedCoursePlace.content"
                  placeholder="30글자 내로 간단하게 작성해주세요."></textarea>
        <div class="flex justify-evenly my-3">
          <button @click="registCoursePlace"
                  class="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded">
            등록
          </button>
          <button @click="cancelRegist" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">취소
          </button>
        </div>
      </div>
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

<template>
  <div class="search-modal">
    <h2>가수 검색 창</h2>
    <input v-model="query" placeholder="가수 이름을 입력하세요" @keydown.enter="search"/>
    <button @click="search">검색</button>

    <div class="search-results-container">
      <ImageCard v-for="(album, idx) in albums" :key="idx" :albumImage="album.image"
                   class="img" @click="selectItem(album)"/>
    </div>
    <!-- 닫기 버튼 추가 -->
    <button class="close-button" @click="closeModal">닫기</button>
  </div>
</template>

<script>
import axios from "axios";
import ImageCard from "@/components/ImageCard.vue";
import router from "@/scripts/router";

export default {
  components: {ImageCard, },
  data() {
    return {
      query: "",
      albums: [],
    };
  },
  methods: {
    search() {
      // 가수 이름을 기반으로 서버에 검색 요청
      axios.get(`/albums`, {
        params: {
          artistName: this.query, // query를 쿼리스트링으로 추가
        },
      })
      .then(response => {
        if (response.data.code == '1009') {
          alert('로그인이 필요한 기능입니다.');
          router.push('/login');
        }
        this.albums = response.data;
      })
    },
    selectItem(item) {
      // 선택된 아이템을 부모 컴포넌트로 전달
      this.$emit("item-selected", item);
    },
    closeModal() {
      // 모달을 닫는 로직 작성
      // 이 예시에서는 간단히 부모 컴포넌트에 이벤트를 발생시켜 닫는 동작을 처리합니다.
      this.$emit("close-modal");
    },
  },
  // 더미 데이터 추가
  // created() {
  //   this.albums = [
  //     {"name": "뉴진스2", image: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202301031113033.jpg"}
  //   ]
  // }
};
</script>

<style scoped>
.search-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 80vh; /* 최대 높이를 지정 (80% 화면 높이) */
  overflow-y: auto; /* 필요할 경우 수직 스크롤 활성화 */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #eee;
  margin: 5px 0;
}

.img {
  width: 100px;
  height: 100px;
}

.search-results-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  max-height: 60vh; /* 최대 높이를 지정 (60% 화면 높이) */
  overflow-y: auto; /* 필요할 경우 수직 스크롤 활성화 */
}
/* 닫기 버튼 스타일 추가 */
.close-button {
  background-color: #d9534f; /* 빨간색 */
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
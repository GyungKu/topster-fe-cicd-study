<template>
  <div>
    <TopsterCard :topster="topster" v-if="topster != null" :no-post="'no'" :centerAlign="true"/>

    <PostContent :post="post" />

    <CommentList :comments="comments" @delete-comment="deleteComment" @edit-comment="editComment" />

    <CommentForm @submit-comment="submitComment" />
  </div>
</template>

<script>
import PostContent from "@/components/PostContent.vue";
import axios from 'axios';
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import router from "@/scripts/router";
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  components: {
    TopsterCard,
    CommentList,
    PostContent,
    CommentForm
  },
  data() {
    return {
      post: {},
      comments: [],
      topster: {},
    };
  },
  mounted() {
    // 게시글 정보와 댓글 목록을 불러오는 API 호출
    const postId = this.$route.params.postId;

    axios.get(`/posts/${postId}`)
    .then(response => {
      this.post = response.data;

      axios.get(`/topsters/${response.data.topsterId}`)
      .then((res) => {
        this.topster = res.data;
      })
    })
    .catch(() => {
      router.push('/posts');
      alert('존재하지 않는 게시글입니다.');
    });

    axios.get(`/posts/${postId}/comments`)
    .then(response => {
      this.comments = response.data;
    })
    .catch(error => {
      console.error('댓글 목록을 불러오는 중 오류 발생:', error);
    });
  },
  methods: {
    submitComment(newComment,) {
      // 댓글 작성 API 호출
      const postId = this.$route.params.postId;
      axios.post(`/posts/${postId}/comments`, {
        content: newComment,
      })
      .then((res) => {
        if (res.data.code == '1009') {
          alert('로그인을 먼저 하십시오');
          const redirect = this.$route.path;
          router.push({name: 'login', query: {redirect: redirect}});
        }
        // 댓글 목록 다시 불러오기
        this.loadComments();
      })
      .catch(error => {
        console.error('댓글 작성 중 오류 발생:', error);
      });
    },

    loadComments() {
      // 댓글 목록을 다시 불러오는 API 호출
      const postId = this.$route.params.postId;
      axios.get(`/posts/${postId}/comments`)
      .then(response => {
        this.comments = response.data;
      })
      .catch(error => {
        console.error('댓글 목록을 불러오는 중 오류 발생:', error);
      });
    },

    editComment(comment) {
      const dataForm = {
        content: comment.content,
      };
      axios.patch(`/comments/${comment.id}`, dataForm)
      .then(() => {
        alert('수정 성공');
        this.loadComments();
      })
      .catch(() => {
        alert('무언가 오류가 발생');
      })
    },

    deleteComment(commentId) {
      axios.delete(`/comments/${commentId}`)
      .then(() => {
        alert('삭제 완료');
        this.loadComments();
      })
      .catch(() => {
        alert('본인의 댓글이 아닙니다.');
      })
    }

  },
};
</script>
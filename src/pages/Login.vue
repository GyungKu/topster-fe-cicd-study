<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="username" class="form-control" id="floatingInput" v-model="username">
      <label for="floatingInput" @keydown.enter="submit">아이디</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword"
             v-model="password" @keydown.enter="submit">
      <label for="floatingPassword">비밀번호</label>
    </div>

    <button class="btn btn-primary w-100 py-2" @click="submit">로그인</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </div>
</template>

<script>



import router from "@/scripts/router";

export default {

  data() {
    return {
      username: "",
      password: ""
    }
  },

  methods: {
    submit() {
      const userData = {
        username: this.username,
        password: this.password
      };

      this.$store.dispatch('login', userData).then(() => {
        const redirect = this.$route.query.redirect || '/';
        router.replace(redirect);
      })
    }
  },
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="username"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
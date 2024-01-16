<template>
  <div class="form-signup w-100 m-auto">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input type="username" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="username">
        <label for="floatingInput">아이디를 입력해 주세요</label>
      </div>
      <div class="form-floating">
        <input type="nickname" class="form-control" id="floatingInput" placeholder="nickname" v-model="nickname">
        <label for="floatingInput">닉네임을 입력해 주세요</label>
      </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
      <label for="floatingPassword">비밀번호를 입력해 주세요</label>
    </div>
    <div class="d-flex align-items-center">
      <div class="form-floating flex-grow-1">
        <input type="email" class="form-control" id="floatingInput" placeholder="email" v-model="email">
        <label for="floatingInput">이메일을 입력해 주세요</label>
      </div>
      <button class="btn btn-outline-secondary ms-2" @click="checkEmail">이메일 인증</button>
    </div>
    <div class="d-flex align-items-center mt-2">
      <div class="form-floating flex-grow-1">
        <input type="text" class="form-control" id="floatingVerificationCode" placeholder="Verification Code" v-model="certification">
        <label for="floatingVerificationCode">인증번호를 입력해 주세요</label>
      </div>
      <button class="btn btn-outline-secondary ms-2" @click="verifyCode">인증번호 확인</button>
    </div>
    <div class="form-floating">
      <input type="intro" class="form-control" id="floatingInput" placeholder="intro" v-model="intro">
      <label for="floatingInput">자기소개를 입력해 주세요</label>
    </div>

      <button class="btn btn-primary w-100 py-2" @click="submit()">회원 가입</button>
      <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data()  {
    return{
      username:"",
          nickname:"",
          password:"",
          email:"",
          certification:"",
          intro:""
    }
  },
  methods: {
    checkEmail() {
      axios.post("/users/mail?email=" + encodeURIComponent(this.email))
      .then(() => {
        window.alert("인증번호가 발송되었습니다.");
      })
      .catch((err) => {
        console.error(err);
        window.alert("인증번호 발송에 실패했습니다.")
      });
    },

    submit() {
      const form = {
        username:this.username,
        nickname:this.nickname,
        password:this.password,
        email:this.email,
        certification:this.certification,
        intro:this.intro,
      }
      axios.post("/users/signup", form)
      .then((res) => {

        if (res.data) {
          window.alert("회원가입이 완료되었습니다.");
        } else {
          window.alert("회원가입이 실패하였습니다.");
        }
      })
      .catch((err) => {
        // 서버가 오류 응답을 보냈을 때의 상태 코드와 오류 메시지를 확인합니다.
        const message = (err.response && err.response.data && err.response.data.message)
            ? err.response.data.message
            : "인증번호 검증 과정에서 문제가 발생했습니다.";
        window.alert(message);
      });
    },

    verifyCode() {
      const form = {
        email:this.email,
        certification:this.certification,
      }
      axios.post("/users/mail/certification", form)
      .then(() => {
        alert("인증번호가 확인되었습니다.")
      })
      .catch((err) => {
        // 서버가 오류 응답을 보냈을 때의 상태 코드와 오류 메시지를 확인합니다.
        const message = (err.response && err.response.data && err.response.data.message)
            ? err.response.data.message
            : "인증번호 검증 과정에서 문제가 발생했습니다.";
        window.alert(message);
      });
    },
  }
}


</script>

<style scoped>
.form-signup {
  max-width: 330px;
  padding: 1rem;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-control {
  padding-right: 100px;
}
.form-floating {
  position: relative;
}

.form-floating .form-control {
  padding-right: 100px; /* 버튼이 있을 자리를 비워두기 위해 오른쪽 패딩을 추가합니다. */
}

.form-floating .btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%; /* 버튼의 높이를 input 필드와 동일하게 맞춥니다. */
  z-index: 10; /* 필요하다면 z-index를 조절하여 버튼이 다른 요소 위에 오도록 합니다. */
}
</style>
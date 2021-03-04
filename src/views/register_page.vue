<template>
  <v-container flow>
    <v-row>
      <v-col cols = "12" class = "text-center my-5">
        <h1 class = "display-1">register page!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class = "text-center" cols = "8" offset= "2" sm = "6" offset-sm = "3">
        <form @submit.prevent = "fnRegisterUser">
          <v-text-field name = "Email" label = "email!!!" type = "email" v-model = "sEmail" required></v-text-field>
          <v-text-field name = "Password" label = "passwrod@!!" type = "password" v-model = "sPassword" required></v-text-field>
          <v-text-field name = "ConfirmPassword" label = "password check" type = "password" v-model = "sConfirmPassword" required
          :rules = "[fnComparePassword]">
          </v-text-field>
          <v-btn type = "submit" v-if = "!fnGetLoading" color = "orange" dark>register</v-btn>
          <v-progress-circular v-if = "fnGetLoading" indeterminate :width= "7" :size = "70" color = "grey lighten-1"></v-progress-circular>
          <v-alert type = "error" dismissible v-model = "bAlert">{{fnGetErrMsg}}</v-alert>
          <v-alert type = "success" dismissible v-model = "bSuccess">Registration success!</v-alert>

        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      bAlert: false,
      bSuccess: false,
      sEmail: "",
      sPassword: "",
      sConfirmPassword: ""
    }
  },
  computed: {
    fnComparePassword() {
      if (this.sPassword == this.sConfirmPassword) {
        return true;
      }
      else {
        return "password is not same. Please check it again."
      }
    },
    fnGetErrMsg() {
      return this.$store.getters.fnGetErrorMessage;
    },
    fnGetLoading() {
      return this.$store.getters.fnGetLoading;
    }
  },
  methods: {
    fnRegisterUser() {
      if(this.fnComparePassword == true) {
        this.$store.dispatch('fnRegisterUser', {
          pEmail: this.sEmail,
          pPassword: this.sPassword
        });
        this.bSuccess = true;
      }
    }
  },
  watch: {
    fnGetErrMsg(pMsg) {//when fnGetErrMsg in computed returns a value, it will be transferred to the parameter of the same method of 'watch'
      if (pMsg) {
        this.bAlert = true;
        this.bSuccess = false;
      }
    },
    bAlert(pValue) {
      if (pValue == false) {
        this.$store.commit("fnSetErrorMessage", "");
      }
    }
  }
}
</script>
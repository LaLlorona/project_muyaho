<template>
  <v-container flow>
    <v-row>
      <v-col cols = "12" class = "text-center my-5">
        <h1 class = "display-1"> login page</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class = "text-center" cols = "8" offset = "2" sm = "6" offset-sm = "3">
        <form @submit.prevent = "fnDoLogin">
          <v-text-field name = "Email" label = "email!!!" type = "email" v-model = "sEmail" required></v-text-field>
          <v-text-field name = "Password" label = "password!!!" type = "password" v-model = "sPassword" required></v-text-field>
          <v-btn type = "submit" v-if = "!fnGetLoading" color = "orange" dark>login</v-btn>

          <v-progress-circular
          v-if = "fnGetLoading"
          indeterminate
          :width = "7"
          :size = "70"
          color = "grey lighten-1"
          ></v-progress-circular>
          <v-alert class = "mt-3" type = "error" dismissble v-model = "bAlert">{{fnGetErrMsg}}</v-alert>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      bAlert : false,
      sEmail: "",
      sPassword: ""
    }
  },
  computed: {
    fnGetLoading() {
      return this.$store.getters.fnGetLoading;
    },
    fnGetErrMsg() {
      return this.$store.getters.fnGetErrorMessage
    }
    

  },
  methods: {
    fnDoLogin() {
      this.$store.dispatch("fnDoLogin", {
        pEmail: this.sEmail,
        pPassword: this.sPassword
      });
    }
  },
  watch: {
    fnGetErrMsg(pMsg) {
      if (pMsg) this.bAlert = true;
    },

    bAlert(pValue) {
      if (pValue == false) {
        this.$store.commit("fnSetErrorMessage", "")
      }
    }
  }
}
</script>
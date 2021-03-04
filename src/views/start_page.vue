<template>
  <v-container>
    <v-row>
      <v-col cols = "12" class = "text-center mt-5">
        <h1 class = "display-1 my-1">start_page</h1>
        <p class = "body-1">everyone can access this page without login</p>
        <v-progress-circular v-if = "fnGetLoading" indeterminate :width= "7" :size= "70">
        </v-progress-circular>
      </v-col>
      <v-col offset="3" cols = "6" class = "text-center mt-5">
        <v-btn @click = "fnDoGoogleLogin_Popup" block outlined color = "red" large dark>
          <v-icon left color = "red">mdi-google</v-icon>google login
        </v-btn>
      </v-col>
      <v-col offset= "3" cols = "6" class = "text-center mt-5">
        <v-btn to = "/login" block color = "red" large dark>
          <v-icon left>mdi-email</v-icon>email login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    fnDoGoogleLogin_Popup() {
      this.$store.dispatch("fnDoGoogleLogin_Popup");
    }
  },
  computed: {
    fnGetLoading() {
      return this.$store.getters.fnGetLoading;
    }
  }
}
</script>
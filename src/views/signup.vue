<template>
	<v-container flow>
		<v-row>
			<v-col cols="12" class="text-center my-5">
				<h1 class="display-1">register page</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
				<form @submit.prevent="fnRegisterUser">
					<v-text-field
						name="Email"
						label="이메일"
						type="email"
						v-model="sEmail"
						required
					></v-text-field>
					<v-text-field
						name="Password"
						label="비밀번호"
						type="password"
						v-model="sPassword"
						required
					></v-text-field>
					<v-text-field
						name="ConfirmPassword"
						label="비밀번호 확인"
						type="password"
						v-model="sConfirmPassword"
						required
						:rules="[fnComparePassword]"
					></v-text-field>
					<v-btn type="submit" v-if="!fnGetLoading" color></v-btn>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {};
</script>

<style></style>

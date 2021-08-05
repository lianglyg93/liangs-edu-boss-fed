<template>
  <div class="login-page">
    <h1>Edu boss管理系统</h1>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      label-width="100px"
      class="login-form"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          autocomplete="off"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="submitForm()"
          :loading="isLoginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { loginIn } from "@/services/user";
import { Form } from "element-ui";
export default Vue.extend({
  name: "loginPage",
  data() {
    return {
      isLoginLoading: false,
      ruleForm: {
        phone: "18201288771",
        password: "111111",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      (this.$refs.ruleForm as Form).validate(async (valid) => {
        if (valid) {
          this.isLoginLoading = true;
          const { data } = await loginIn(this.ruleForm);
          this.isLoginLoading = false;
          if (data.state !== 1) {
            return this.$message.error(data.message);
          }
          this.$store.commit("setUser", data.content);
          const { redirectUrl = "/" } = this.$route.query;
          console.log(redirectUrl);
          this.$router.push(redirectUrl as string);
        } else {
          return false;
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.login-page {
  background: #e9eef3;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // width: 340px;
  // margin: 0 auto;
  // h1 {
  //   margin: 4.5rem 0 3.5rem;
  //   text-align: center;
  //   letter-spacing: 0.1em;
  // }
  .login-form {
    width: 340px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>

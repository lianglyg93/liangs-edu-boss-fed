<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import { uploadCourseImage } from "@/services/course";
import Vue from "vue";
import E from "wangeditor";

export default Vue.extend({
  name: "TextEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor as any);
      editor.config.onchange = (value: string) => {
        this.$emit("input", value);
      };
      editor.create();
      editor.txt.html(this.value);
      console.log("this.value==", this.value);

      editor.config.customUploadImg = async function (
        resultFiles: any,
        insertImgFn: any
      ) {
        const formData = new FormData();
        formData.append("file", resultFiles[0]);

        const { data } = await uploadCourseImage(formData);

        if (data.code === "000000") {
          insertImgFn(data.data.name);
        }
      };
    },
  },
});
</script>

<style lang="scss" scoped></style>

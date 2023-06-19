<template>
  <van-overlay :show="visible" @click="close">
    <div class="dialog" @click.stop>
      <div class="content">
        <h2 v-if="title">{{ title }}</h2>
        <SvgIcon
          v-if="showClose"
          class="close"
          name="dialog-close"
          @click="close"
        />
        <div class="flex">
          <div class="text" v-html="content"></div>
        </div>
      </div>
      <div v-if="showButton" class="button-group">
        <button v-if="showCancelButton" class="cancel" @click="close">
          {{ cancelText }}
        </button>
        <button class="confirm" @click="confirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { SvgIcon } from "@/common/svgIcon";

const state = reactive<{
  visible: boolean;
  promptVal: string;
  type: string;
}>({
  visible: true,
  promptVal: "",
  type: "confirm",
});

//vue3 语法限制，暂不支持从外部导入的类型，可能会在未来的版本中被解除
const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;
    showClose?: boolean;
    showButton?: boolean;
    showCancelButton?: boolean;
    confirmText?: string;
    cancelText?: string;
  }>(),
  {
    title: "",
    content: "DialogContent",
    showClose: false,
    showButton: true,
    showCancelButton: false,
    confirmText: "确认",
    cancelText: "取消",
  }
);

const { visible } = toRefs(state);
console.log(props);

/**
 * @description    : 设置显示隐藏
 * @param           { boolean } isVisible
 * @return          { }
 */
const setVisible = (isVisible: boolean) => {
  state.visible = isVisible;
};

//关闭
const close = () => {
  state.type = "cancel";
  setVisible(false);
};

const confirm = () => {
  state.type = "confirm";
  setVisible(false);
};

//暴露
defineExpose({
  setVisible,
  state,
});
</script>

<style lang="scss" scoped>
.dialog {
  width: 600px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
  border-radius: 6px 6px 6px 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .content {
    text-align: center;
    padding: 60px 40px;
    line-height: 40px;
    font-size: 30px;
    border-bottom: 1px solid #f5f5f5;
    h2 {
      font-size: 34px;
      color: #333333;
      font-weight: bold;
      padding: 0 0 24px 0;
    }
    p {
      padding: 24px 0 60px;
    }
    .flex {
      display: flex;
      align-items: center;
      .text {
        color: #333333;
        font-size: 30px;
        text-align: left;
      }
    }
  }
}
.button-group {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 0;
  height: 100px;
  line-height: 100px;
  button {
    font-size: 32px;
    height: 100px;
    line-height: 100px;
  }
  .cancel {
    width: 50%;
    color: #999999;
    position: relative;
    &::after {
      content: "";
      height: 56px;
      width: 1px;
      background: #ededed;
      position: absolute;
      right: 0;
      top: 22px;
    }
  }
  .confirm {
    width: 50%;
    color: $orange;
  }
}
</style>

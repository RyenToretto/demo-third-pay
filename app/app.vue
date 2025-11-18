<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// 全局样式和配置
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  }
})
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

/* 通用按钮样式 */
button {
  font-family: inherit;
}

/* 禁用按钮样式 */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 文本选择样式 */
::selection {
  background: #409eff;
  color: #fff;
}
</style>


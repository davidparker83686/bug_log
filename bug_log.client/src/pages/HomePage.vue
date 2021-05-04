<template>
  <div class="home bg-secondary flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <span class="text-dark large"> Bug Log where you come to log your bugs.<i class="fas fa-spider" title="bugs"></i></span>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  .large{
    font-size: 30px;
  }
}
</style>

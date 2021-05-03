
<template>
  <router-link :to="{name: 'BugsDetails', params: {id: bug.id}}">
    <li class=" row board hover border-bottom">
      <div class="col-3 d-inline ">
        {{ bug.title }}
      </div>
      <div class="col-3 d-inline ">
        {{ (bug.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (bug.creator.name.split('@')[0]).substring(1) }}
      </div>
      <div class="col-3 d-inline ">
        {{ bug.closed }}
      </div>
      <div class="col-3 d-inline ">
        {{ bug.closedDate }}
      </div>
    </li>
  </router-link>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    return {
      state,
      async getOneBug(id) {
        try {
          await bugsService.getOneBug(id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteBug(id) {
        try {
          await bugsService.deleteBug(id)
          Notification.toast('Successfully Closed Bug', 'success')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.hover:hover{
background-color: aqua;
}
</style>

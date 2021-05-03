
<template>
  <router-link :to="{ name: 'BugsDetailsPage', params: {id: bug.id}}">
    <li class=" row list board hover border-bottom">
      <div class="col-3 d-inline ">
        {{ bug.title }}
      </div>
      <div class="col-3 d-inline ">
        <img
          :src="bug.creator.picture"
          alt="user photo"
          height="20"
          class="rounded-circle px-2"
        />
        {{ (bug.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (bug.creator.name.split('@')[0]).substring(1) }}
      </div>
      <div class="col-3 d-inline closed p-0" v-if="bug.closed==true">
        CLOSED
      </div>
      <div class="col-3 d-inline open p-0" v-if="bug.closed==false">
        OPEN
      </div>
      <div class="col-3 d-inline ">
        5/1/21
        {{ bug.timestamps }}
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

.closed{
  color:red
}
.open{
  color: green
}
</style>


<template>
  <router-link :to="{name: 'BugsDetailsPage', params: {id: bug.id}}">
    <li class=" row list board hover border-bottom">
      <div class="col-8 col-md-3 twenty text-dark">
        {{ bug.title }}
      </div>
      <div class="col-0 col-md-3 twenty d-none d-md-block text-dark" v-if="bug.creator">
        <img
          :src="bug.creator.picture"
          alt="user photo"
          height="20"
          class="rounded-circle px-2"
        />
        {{ (bug.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (bug.creator.name.split('@')[0]).substring(1) }}
      </div>
      <div class="col-3 col-md-3 twenty closed p-0" v-if="bug.closed==true">
        CLOSED
      </div>
      <div class="col-3 col-md-3 twenty open p-0" v-if="bug.closed==false">
        OPEN
      </div>
      <div class="col-0 col-md-3 p-0 twenty d-none d-md-block text-dark">
        <!-- closedDate
        timestamps -->
        {{ Date(bug.updatedAt).split(' ')[0] }},
        {{ Date(bug.updatedAt).split(' ')[1] }} /
        {{ Date(bug.updatedAt).split(' ')[2] }} /
        {{ Date(bug.updatedAt).split(' ')[3] }}
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
    // note: {
    //   type: Object,
    //   required: true
    // }
  },
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes)
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
background-color: rgb(255, 188, 157);
}
/* .list:nth-child(2),
.list:nth-child(4),
.list:nth-child(6),
.list:nth-child(8),
.list:nth-child(10){
background-color: rgb(202, 127, 127) ;
} */
/* li:nth-child(even){
background-color: rgb(127, 202, 177) ;
} */

.closed{
  color:red
}
.open{
  color: green
}
.twenty{
  font-size: 20px;
}
</style>

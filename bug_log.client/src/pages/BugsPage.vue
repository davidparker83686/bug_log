<template>
  <div class="container-fluid bg-info bugsPage">
    <div class="row justify-content-between">
      <div class="col-12 col-md-8 mt-md-5 mb-0 mx-md-5 pl-md-2">
        <h2 class="mb-0">
          CURRENT BUGS
        </h2>
      </div>
      <div class="col-12 col-md-2 mt-md-5 mb-0 mx-md-5">
        <button type="button" class="btn btn-warning" data-toggle="modal" title="Create Bug" data-target="#bug">
          NEW BUG
        </button>
      </div>
      <div class="col-11 d-md-flex justify-content-end">
        <button type="button"
                class="btn btn-info mr-md-4 py-0"
                data-toggle="modal"
                title="Create Bug"
                data-target="#bug"
                @click="hide"
        >
          Hide Closed
        </button>
      </div>
    </div>

    <!-- row -->
    <div class="row justify-content-center">
      <div class=" col-11 card" style="width: 18rem;">
        <!-- row -->
        <div class="card-header row">
          <div class="col-3 d-inline p-0">
            TITLE
          </div>
          <div class="col-3 d-inline p-0">
            REPORTED BY
          </div>
          <div class="col-3 d-inline p-0">
            STATUS
          </div>
          <div class="col-3 d-inline p-0">
            LAST MODIFIED
          </div>
        </div>
        <bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
      </div>
    </div>
    <!-- row end -->
    <bugCreationModal />
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'Bugs',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
        logger.log(state.account)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scope >
// .list:nth-child(odd){
// background-color: rgb(202, 127, 127) ;
// }

// li:nth-child(even){
// background-color: rgb(202, 127, 127) ;
// }
</style>

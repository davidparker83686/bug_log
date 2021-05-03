<template>
  <div class="container-fluid bg-info bugsPage">
    <div class="row justify-content-between">
      <div class="col-12 col-md-8 mt-md-5 mb-md-3 mx-md-5 pl-md-2">
        <h2>CURRENT BUGS</h2>
      </div>
      <div class="col-12 col-md-2 mt-md-5 mb-md-3 mx-md-5">
        <button type="button" class="btn btn-info lightest-green-text" data-toggle="modal" title="Create Bug" data-target="#bug">
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
            Title
          </div>
          <div class="col-3 d-inline p-0">
            Reported
          </div>
          <div class="col-3 d-inline p-0">
            Status
          </div>
          <div class="col-3 d-inline p-0">
            Last Modified
          </div>
        </div>
        <!-- row end -->

        <!-- row -->

        <bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
        <!-- <ul class="row list-group list-group-flush">
        </ul> -->

        <!-- row -->
      </div>
    </div>
    <!-- row end -->
    <!-- <bugCreationModal /> -->
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

<style lang="scss" >
</style>

<template>
  <div class="container-fluid bg-secondary bugsPage">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 my-md-5 my-2 mb-0 mx-md-5 pl-md-2">
        <h2 class="mb-0 text-dark">
          <b>
            CURRENT BUGS

          </b>
        </h2>
      </div>
      <div class="col-12 col-md-2 mt-md-5 mb-0 px-md-0 px-3 my-md-5 my-2 mb-0 mx-md-5 md-text-right">
        <button type="button"
                class="btn btn-danger text-white shadow"
                title="Report New Bug"
                aria="Report New Bug"
                data-toggle="modal"
                data-target="#bug"
        >
          <b>

            REPORT A BUG
          </b>
          <!-- <i class="fas fa-plus"></i> -->
        </button>
      </div>
      <div class="col-12 col-md-10 d-md-flex justify-content-end">
        <div class="form-check"
             title="Show Open Bugs"
             aria="Show Open Bugs"
             @click="getOpenBugs"
        >
          <input class="form-check-input"
                 type="radio"
                 name="exampleRadios"
                 id="exampleRadios1"
                 value="option1"
                 checked
          >
          <!-- <label class="form-check-label text-dark twenty " for="exampleRadios1">
            Hide/Show Closed Bugs
          </label> -->
        </div>
      </div>
    </div>

    <!-- row -->
    <div class="row justify-content-center">
      <div class=" col-11 card" style="width: 18rem">
        <!-- row -->
        <div class="card-header bg-dark text-primary row">
          <div class="col-4 d-inline col-md-3 d-inline p-0 twenty ">
            <b>
              TITLE
            </b>
          </div>
          <div class="col-0 col-md-3 d-inline p-0 twenty ">
            <b class="d-none d-md-block">
              REPORTED BY
            </b>
          </div>
          <div class="col-0 col-md-3 d-inline p-0 twenty ">
            <b class="d-none d-md-block">
              STATUS
            </b>
          </div>
          <div class="col-0 col-md-3 d-inline p-0 twenty">
            <b class="d-none d-md-block">
              LAST MODIFIED
            </b>
          </div>
        </div>
        <div class="scroll">
          <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
        </div>
      </div>
    </div>

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
      state,
      async getOpenBugs() {
        try {
          await bugsService.getOpenBug()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scope >
.twenty{
  font-size: 20px;
}
// .list:nth-child(1),
// .list:nth-child(4),
// .list:nth-child(6),
// .list:nth-child(8),
// .list:nth-child(10){
// background-color: rgb(202, 127, 127) ;
// }
// .list:nth-child(even){
// background-color: rgb(127, 197, 202) ;
// }

// li:nth-child(even){
// background-color: rgb(202, 127, 127) ;
// }

.scroll{
    overflow-y: scroll;
    // overflow-:auto;
    // flex-wrap: nowrap;
    max-height: 33vw;// display: inline-block;
}

@media screen and (max-width:760px){
  .scroll{
    overflow-y: scroll;
    max-height: 75vw;// display: inline-block;
  }
}
</style>

<template>
  <div class="container-fluid bg-secondary bugsDetailsPage">
    <div class="row justify-content-center" v-if="state.bug">
      <div class=" col-11 d-flex justify-content-between my-2 my-md-5 p-0 text-dark">
        <h2> {{ (state.bug.title).toUpperCase() }}</h2>
        <div class="">
          <button type="button"
                  class="btn btn-danger shadow"
                  title="Close Bug"
                  aria-label="Close Bug"
                  v-if="state.account.id === state.bug.creatorId"
                  @click="deleteBug"
          >
            CLOSE
          </button>
        </div>
      </div>

      <div class="col-11 d-flex justify-content-between p-0 ">
        <div>
          <h3 class="d-none d-md-block text-dark">
            REPORTED BY:
          </h3>
          <h3 class="text-dark">
            <img
              :src="state.bug.creator.picture"
              alt="user photo"
              height="60"
              class="rounded-circle"
            />
            {{
              (state.bug.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (state.bug.creator.name.split('@')[0]).substring(1)
            }}
          </h3>
        </div>

        <div class="text-right d-inline">
          <h3 class="d-none d-md-block text-dark">
            STATUS:
          </h3>
          <h3 class="col-3 closed p-0" v-if="state.bug.closed==true">
            CLOSED
          </h3>

          <h3 class="col-3 open p-0 mt-2" v-if="state.bug.closed==false">
            OPEN
          </h3>
        </div>
      </div>

      <div class=" card shadow rounded col-11 my-2">
        <h3 class="boarder rounded text-dark">
          {{ state.bug.description }}
        </h3>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-11 w-100 my-1 my-md-3 d-flex justify-content-between p-0 text-dark">
        <h2>Notes</h2>
        <div>
          <button type="button" title="Create Note" class="btn btn-primary shadow" data-toggle="modal" data-target="#note">
            New Note
          </button>
        </div>
      </div>

      <div class="card overflow p-0 col-11 mb-5 shadow" style="width: 18rem;">
        <div class="card-header bg-dark row justify-content-around px-0">
          <div class="col-3 col-md-3 twenty text-primary">
            <b>

              NAME
            </b>
          </div>
          <div class="col-6 col-md-6 px-0 twenty text-primary">
            <b>

              MESSAGE
            </b>
          </div>
          <div class="col-1 d-none d-md-block twenty text-primary">
            <b>

              DELETE
            </b>
          </div>
        </div>

        <Note v-for="note in state.notes" :key="note.id" :note="note" />
      </div>
    </div>

    <noteCreationModal />
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
// import { tasksService } from "../services/TasksService"
export default {
  name: 'BugsDetailsPage',
  props: {
    note: {
      type: Object,
      required: true
    },
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => AppState.notes),
      bug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugsService.getOneBug(route.params.id)
        await notesService.getAllNotes(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async deleteBug() {
        try {
          await bugsService.deleteBug(state.bug.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss">
// .home{
// }
// .new-note-button{
//   max-height: 50px;
// }
// @media screen and (min-width:760px){
// .side-scroll{
//     overflow-x: auto;
//     // overflow-:auto;
//     flex-wrap: nowrap;
//     max-width: 100vw;// display: inline-block;
// }
// }
.overflow{
  overflow: hidden;
}

.hover:hover{
background-color: peachpuff;
}

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

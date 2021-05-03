<template>
  <div class="container-fluid bg-warning bugsDetailsPage">
    <div class="row" v-if="state.bug">
      <div class=" col-12">
        <h2>TITLE: <br> {{ (state.bug.title).toUpperCase() }}</h2>
      </div>
      <div class="col-12 d-flex justify-content-between">
        <h3>REPORTED BY: {{ state.bug.creatorId }}</h3>
        <h3>STATUS: {{ state.bug.closed }}</h3>
      </div>

      <h3 class="boarder rounded">
        {{ state.bug.description }}
      </h3>
      <div class="col-11 d-flex justify-content-start">
        <button type="button" title="Close Details Page" class="btn btn-danger ">
          CLOSE
        </button>
      </div>
    </div>

    <div class="row" v-if="state.notes">
      <h2>Notes</h2>
      <div class="card col-10" style="width: 18rem;">
        <div class="card-header">
          <div class="row">
            <div class="col-2">
              Name
            </div>
            <div class="col-9">
              Message
            </div>
            <div class="col-1">
              Delete
            </div>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="row list-group-item" v-for="note in state.notes" :key="note.id" :note="note">
            <div class="col-2">
              {{ note.creatorId }}
            </div>
            <div class="col-9">
              {{ note.body }}
            </div>
            <div class="col-1">
              <button type="button" class="btn btn-danger">
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row" v-else>
      <span>No Notes</span>
    </div>
    <button type="button" title="Create Note" class="btn btn-info " data-toggle="modal" data-target="#note">
      New Note
    </button>
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
  name: 'BugsDetails',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => AppState.notes),
      bug: computed(() => AppState.activeBug)
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
      state
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
</style>

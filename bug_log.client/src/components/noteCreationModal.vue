<template>
  <div>
    <div class="modal grey-over"
         id="note"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
         data-backdrop=""
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-success">
          <div class="modal-header border-bottom-0 d-flex justify-content-center">
            <h5 class="modal-title blacktext" id="exampleModalLabel">
              <b>

                ADD A COMMENT
              </b>
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNote">
              <!-- <div class="form-group">
                <label for="title">Title:</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="title..."
                       v-model="state.newNote.title"
                       required
                >
              </div> -->

              <b>

                <!-- {{ (state.account.name.split('@')[0]).toUpperCase() }} -->
                {{ state.account.name }}
              </b>

              <!-- <div class="form-group">
                <span>Reported By: {{ (account.name.split('@')[0]).charAt(0).toUpperCase()+ (bug.creator.name.split('@')[0]).substring(1) }}</span>
              </div> -->

              <div class="form-group">
                <label for="body">Comment:</label>
                <input type="text"
                       class="form-control"
                       id="body"
                       placeholder="comment..."
                       v-model="state.newNote.body"
                       required
                >
              </div>

              <div class="modal-footer d-flex justify-content-around">
                <button type="submit" class="btn hover-white btn-warning border-0">
                  Create
                </button>
                <button type="button" class="btn  btn-danger text-white" data-dismiss="modal">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import $ from 'jquery'
export default {
  Name: 'NoteModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      newNote: {}
    })
    return {
      state,
      async createNote() {
        $('#note').modal('hide')
        state.newNote.bug = route.params.id
        await notesService.createNote(state.newNote)
        state.newNote = {}
        await notesService.getAllNotes(route.params.id)
      }
    }
  }
}
</script>
<style scoped>
/* .hover-white:hover{
  color:rgb(255, 255, 255)
} */
.blacktext{
  color:rgb(19, 19, 19)
}
/* overflowhidden */
</style>

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
        <div class="modal-content bg-danger">
          <div class="modal-header border-bottom-0 d-flex justify-content-center">
            <h5 class="modal-title  text-light" id="exampleModalLabel">
              ADD A COMMENT
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
              <!-- <div class="form-group">
                <label for="creator.name">Reported By:</label>
                <input type="text"
                       class="form-control"
                       id="creator.name"
                       placeholder="creator.name..."
                       v-model="state.newNote.creator.name"
                       required
                >
              </div> -->

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
                <button type="submit" class="btn hover-white btn-primary border-0">
                  Create
                </button>
                <button type="button" class="btn  btn-warning" data-dismiss="modal">
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
import $ from 'jquery'
export default {
  Name: 'NoteModal',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      newNote: {}
    })
    return {
      state,
      async createNote() {
        $('#note').modal('hide')
        await notesService.createNote(state.newNote)
        state.newNote = {}
      }
    }
  }
}
</script>
<style scoped>
/* .hover-white:hover{
  color:rgb(255, 255, 255)
} */
</style>

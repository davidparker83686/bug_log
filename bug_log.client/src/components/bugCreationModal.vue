<template>
  <div>
    <div class="modal dark-blue-over"
         id="bug"
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
              REPORT A NEW BUG
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createBug">
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="title..."
                       v-model="state.newBug.title"
                       required
                >
              </div>

              <!-- <div class="form-group">
                <label for="creator.name">Reported By:</label>
                <input type="text"
                       class="form-control"
                       id="creator.name"
                       placeholder="creator.name..."
                       v-model="state.newBug.creator.name"
                       required
                >
              </div> -->

              <div class="form-group">
                <label for="description">Comment:</label>
                <input type="text"
                       class="form-control"
                       id="description"
                       placeholder="description..."
                       v-model="state.newBug.description"
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
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
export default {
  Name: 'BugModal',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async createBug() {
        $('#bug').modal('hide')
        await bugsService.createBug(state.newBug)
        state.newBug = {}
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

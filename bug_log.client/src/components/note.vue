<template>
  <li class=" row justify-content-around list note hover border-bottom">
    <div class="col-4 col-md-3">
      <img
        :src="note.creator.picture"
        alt="user photo"
        height="20"
        class="rounded-circle px-2"
      />

      <!-- {{ (note.creator.name.split('@'))[0] }} -->
      <span class="twenty text-dark">
        {{ (note.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (note.creator.name.split('@')[0]).substring(1) }}
        <!-- {{ note.creator.name }} -->

      </span>
    </div>

    <div class="col-6 px-0 twenty text-dark">
      {{ note.body }}
    </div>

    <div class="col-1 p-0  d-md-flex justify-content-center">
      <button type="button"
              class="btn btn-none text-danger px-1"
              title="Delete Comment"
              aria-label="Delete Comment"
              @click="deleteNote"
              v-if="state.account.id === note.creatorId"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </li>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async getOneNote(id) {
        try {
          await notesService.getOneNote(id)
        } catch (error) {
          logger.error(error)
        }
      },

      // not passing param into top level because were not passing anything from the template and are passing in params that are props.note.id into our lower level using props, so dont forget to pass 'props' into our setup() ex: setup(props)
      async deleteNote() {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this Note?', "You won't be able to revert this!", 'warning', 'Yes, delete it!')) {
            await notesService.deleteNote(props.note.id)
          }
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

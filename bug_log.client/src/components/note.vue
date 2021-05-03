<template>
  <li class=" row list note hover border-bottom">
    <div class="col-3 d-inline ">
      <img
        :src="note.creator.picture"
        alt="user photo"
        height="20"
        class="rounded-circle px-2"
      />
      {{ (note.creator.name.split('@')[0]).charAt(0).toUpperCase()+ (note.creator.name.split('@')[0]).substring(1) }}
    </div>

    <div class="col-8 d-inline ">
      {{ note.body }}
    </div>

    <div class="col-1 d-inline ">
      <button type="button" class="btn btn-danger">
        Delete Note
      </button>
    </div>
  </li>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      notes: computed(() => AppState.notes)
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
      async deleteNote(id) {
        try {
          await notesService.deleteNote(id)
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
background-color: peachpuff;
}

.closed{
  color:red
}
.open{
  color: green
}
</style>

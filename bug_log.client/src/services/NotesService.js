import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class NotesService {
  async getAllNotes(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
  }

  async getOneNote(id, id2) {
    const res = await api.get(`api/bugs/${id}/notes/${id2}`)
    AppState.activeNote = res.data
  }

  async createNote(note) {
    const res = await api.post('api/notes', note)
    AppState.notes.push(res.data)
    Notification.toast('Successfully Created Note', 'success')
  }

  async editNote(id, body) {
    await api.put(`api/notes/${id}`, body)
    this.getAllNotes()
  }

  async deleteNote(id) {
    Notification.confirmAction('Are you sure you want to delete this Note?', "You won't be able to revert this!", 'warning', 'Yes, delete it!')
    await api.delete(`api/notes/${id}`)
    AppState.notes = AppState.notes.filter(l => l.id !== id)
    Notification.toast('Successfully Deleted Note', 'success')
  }

  // async changeNote(bug, note) {
  //   const res = await api.get(`api/bugs/${bug}/notes`)
  //   AppState.changeNote = res.data.filter(l => l.id !== note)
  // }
}

export const notesService = new NotesService()

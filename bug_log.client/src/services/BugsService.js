import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getOneBug(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.activeBug = res.data
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    // better way because we donthave to make another call to the back end and will do it localy
    AppState.bugs.push(res.data)
    Notification.toast('Successfully Created Bug', 'success')
  }

  async editBug() {

  }

  async deleteBug(id) {
    await api.delete(`api/bugs/${id}`)
    this.getAllBugs()
  }
}

export const bugsService = new BugsService()

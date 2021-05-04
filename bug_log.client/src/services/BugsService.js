import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'
import router from '../router.js'
import { logger } from '../utils/Logger'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    logger.log(res.data)
  }

  async getOpenBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.filter(l => l.closed === false)
  }

  async getOneBug(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.activeBug = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    // better way because we donthave to make another call to the back end and will do it localy
    AppState.bugs.push(res.data)
    router.push({ name: 'BugsDetailsPage', params: { id: res.data.id } })
    Notification.toast('Successfully Created Bug', 'success')
  }

  async editBug() {

  }

  async deleteBug(id) {
    Notification.confirmAction('Are you sure you want to close this Bug?', "You won't be able to revert this", 'warning', 'Yes, delete it!')
    await api.delete(`api/bugs/${id}`)
    this.getAllBugs()
  }
}

export const bugsService = new BugsService()

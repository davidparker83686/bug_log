import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.deleteNote)
      .put('/:id', this.editNote)
      .post('', this.createNote)
  }

  async deleteNote(req, res, next) {
    try {
      const data = await notesService.deleteNote(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await notesService.editNote(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      logger.log(req.body)
      const data = await notesService.createNote(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

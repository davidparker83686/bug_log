
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getOneBug)
      .get('/:id/notes', this.getAllNotes)
      .get('/:id/notes/:id', this.getOneNote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.deleteBug)
      .put('/:id', this.editBug)
      .post('', this.createBug)
  }

  async getAllBugs(req, res, next) {
    try {
      //
      const data = await bugsService.getAllBugs(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneBug(req, res, next) {
    try {
      const data = await bugsService.getOneBug(req.params.id)
      // data  is returning what is given back from teh service
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.deleteBug(req.body)
      // const data = await bugsService.deleteBug(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.id = req.params.id
      delete req.body.closed
      const data = await bugsService.editBug(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.createBug(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotes(req, res, next) {
    try {
      const data = await notesService.getAllNotes(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneNote(req, res, next) {
    try {
      const data = await notesService.getOneNote(req.query)
      // data  is returning what is given back from teh service
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

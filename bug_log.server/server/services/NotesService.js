import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAllNotes(id) {
    const notes = await dbContext.Note.find({ bug: id }).populate('creator')
    return notes
  }

  async getOneNote(id) {
    const note = await dbContext.Note.findOne({ _id: id }).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async deleteNote(id) {
    const data = await dbContext.Note.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async editNote(body) {
    // what does this param say?
    const data = await dbContext.Note.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createNote(body) {
    return await dbContext.Note.create(body)
  }
}

export const notesService = new NotesService()

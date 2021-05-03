
import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAllBugs(query = {}) {
    const bugs = await dbContext.Bug.find(query).populate('creator')
    return bugs
  }

  async getOneBug(id) {
    const bug = await dbContext.Bug.findOne({ _id: id }).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async deleteBug(body) {
    body.closed = true
    const data = await dbContext.Bug.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }
  // } else {
  //   ogBug.closed = true
  //   const data = await dbContext.Bug.findOneAndUpdate({ _id: body.id }, body, { new: true })
  //   return data
  // }

  async editBug(body) {
    const ogBug = await this.getOneBug(body.id)
    if (ogBug.closed === true) {
      throw new BadRequest('This bug is closed')
    } else {
      const data = await dbContext.Bug.findOneAndUpdate({ _id: body.id }, body, { new: true })
      if (!data) {
        throw new BadRequest('Invalid Bug Id or Not The Creator')
      }
      return data
    }
  }

  async createBug(body) {
    return await dbContext.Bug.create(body)
  }
}

export const bugsService = new BugsService()

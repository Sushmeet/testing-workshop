import { initDb } from 'til-server-test-utils'
import {omit} from 'lodash'
import * as userController from './users'

describe('Getusers', () => {
  test('getUsers returns all the users in the database', async () => {
    const {users: actualUsers} = await initDb()
    const safeUser = user => {
      return omit(user, ['exp', 'iat', 'hash', 'salt'])
    }

    const req = {}
    const res = {
      json: jest.fn(),
    }

    await userController.getUsers(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      users: actualUsers.map(safeUser),
    })
  })
})

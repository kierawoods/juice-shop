import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import config from 'config'
import { retrieveAppConfiguration } from '../../routes/appConfiguration'
const expect = chai.expect
chai.use(sinonChai)

describe('appConfiguration', () => {
  let req: any
  let res: any

  it('should return configuration object', () => {
    req = {}
    res = { json: sinon.spy() }

    retrieveAppConfiguration()(req, res)
    expect(res.json).to.have.been.calledWith({ config })
  })
})

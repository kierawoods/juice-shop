import sinon from 'sinon'
import config from 'config'
import chai from 'chai'
import sinonChai from 'sinon-chai'

import { version } from '../../package.json'
import { retrieveAppVersion } from '../../routes/appVersion'

const expect = chai.expect
chai.use(sinonChai)

describe('appVersion', () => {
  let req: any
  let res: any

  it('should ' + config.get<boolean>('application.showVersionNumber') ? '' : 'not ' + 'return version specified in package.json', () => {
    req = {}
    res = { json: sinon.spy() }

    retrieveAppVersion()(req, res)
    expect(res.json).to.have.been.calledWith({ version: config.get<boolean>('application.showVersionNumber') ? version : '' })
  })
})

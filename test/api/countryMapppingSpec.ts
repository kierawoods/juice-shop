import * as frisby from 'frisby'

const REST_URL = 'http://localhost:3000/rest'

describe('/rest/country-mapping', () => {
  it('GET no country mapping present in default configuration', () => {
    return frisby.get(REST_URL + '/country-mapping')
      .expect('status', 500)
  })
})

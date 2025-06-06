import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'

import { RecycleService } from './recycle.service'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('RecycleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [RecycleService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
  })

  it('should be created', inject([RecycleService], (service: RecycleService) => {
    expect(service).toBeTruthy()
  }))

  it('should find the recycle directly from the rest api', inject([RecycleService, HttpTestingController],
    fakeAsync((service: RecycleService, httpMock: HttpTestingController) => {
      let res: any
      service.find().subscribe((data) => (res = data))
      const req = httpMock.expectOne('http://localhost:3000/api/Recycles/')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('GET')
      expect(req.request.params.toString()).toBeFalsy()
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should create recycle directly via the rest api', inject([RecycleService, HttpTestingController],
    fakeAsync((service: RecycleService, httpMock: HttpTestingController) => {
      let res: any
      service.save(1).subscribe((data) => (res = data))
      const req = httpMock.expectOne('http://localhost:3000/api/Recycles/')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toBe(1)
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))
})

import { environment } from 'src/environments/environment'
import { Injectable, NgZone } from '@angular/core'
import { io, type Socket } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private _socket: Socket

  constructor (private readonly ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      if (environment.hostServer === '.') {
        this._socket = io(window.location.origin, {
          path: (window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/') + 'socket.io'
        })
      } else {
        this._socket = io(environment.hostServer)
      }
    })
  }

  socket () {
    return this._socket
  }
}

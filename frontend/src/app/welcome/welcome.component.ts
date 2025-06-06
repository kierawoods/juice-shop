import { Component, type OnInit } from '@angular/core'
import { ConfigurationService } from '../Services/configuration.service'
import { MatDialog } from '@angular/material/dialog'
import { WelcomeBannerComponent } from '../welcome-banner/welcome-banner.component'
import { CookieService } from 'ngy-cookie'

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true
})

export class WelcomeComponent implements OnInit {
  private readonly welcomeBannerStatusCookieKey = 'welcomebanner_status'

  constructor (private readonly dialog: MatDialog, private readonly configurationService: ConfigurationService, private readonly cookieService: CookieService) { }

  ngOnInit (): void {
    const welcomeBannerStatus = this.cookieService.get(this.welcomeBannerStatusCookieKey)
    if (welcomeBannerStatus !== 'dismiss') {
      this.configurationService.getApplicationConfiguration().subscribe((config: any) => {
        if (config?.application?.welcomeBanner && !config.application.welcomeBanner.showOnFirstStart) {
          return
        }
        this.dialog.open(WelcomeBannerComponent, {
          minWidth: '320px',
          width: '35%',
          position: {
            top: '50px'
          }
        })
      }, (err) => { console.log(err) })
    }
  }
}

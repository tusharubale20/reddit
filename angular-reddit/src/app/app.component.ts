import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-reddit';

  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private updates: SwUpdate) {

    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    })

    translate.addLangs(['en','ja']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    const storedLang = localStorage.retrieve("language");
    if(storedLang) {
      translate.use(storedLang);
    } else {
      translate.use(browserLang.match('/en|jp/') ? browserLang : 'en');
    }
  }

  ngOnInit(): void {
    this.printConsoleImage();
  }

  private printConsoleImage() {
    console.log(' '+
      `Thanks for checking my reddit application `+ '\n'+
      `Original: https://www.reddit.com/  `+ '\n'+
      `Best Regards, `+ '\n'+
      `Tushar`
    );
  }

  
}

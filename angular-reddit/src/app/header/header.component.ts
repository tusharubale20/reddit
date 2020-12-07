import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { faUser, faGlobe, faMoon} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isNightModeOn: boolean;
  username: string;
  faUser = faUser;
  faLanguage = faGlobe;
  faMoon = faMoon;
  
  constructor(private authService: AuthService, 
    private router: Router,
    public translate: TranslateService,
    private localStorage: LocalStorageService,
    private themeService: ThemeService) {

      if(this.localStorage.retrieve("isNightModeOn")) {
        this.isNightModeOn = this.localStorage.retrieve("isNightModeOn")
      } 
    }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();

  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/'+this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  changeLang(language: string) {
    this.translate.use(language);
    this.localStorage.store("language", language);
  }

  toggleTheme() {
    
    if(this.themeService.isDarkTheme()) {
      this.localStorage.store("isNightModeOn", false);
      this.themeService.setLightTheme();
    } else {
      this.localStorage.store("isNightModeOn", true);
      this.themeService.setDarkTheme();
    }

  }

}

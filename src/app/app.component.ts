import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from './i18n/i18n.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// Title is a service that can be used to get and set the title of a current HTML document.
// Since an Angular application can't be bootstrapped on the entire HTML document (<html> tag) it is not possible to bind to the text property of the HTMLTitleElement elements (representing the <title> tag). Instead, this service can be used to set and get the current title value.
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgbModule],
  providers: [NgbActiveModal],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'products-i18n';

  constructor(private titleService: Title, private i18nService: I18nService) {}

  async ngOnInit() {
    await this.getLang();
    this.titleService.setTitle(this.i18nService.t('app.title'));
  }

  test: any = false;
  async getLang() {
    const lang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
    const result = await this.i18nService.loadTranslations(lang);
    this.test = typeof result === 'boolean' ? result : false;
  }
}

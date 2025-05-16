import { Component } from '@angular/core';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-footer',
  imports: [I18nPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private i18nService: I18nService){}

  lang:'en'|'ar' = 'en';

  changeLanguage(lang: 'en'|'ar'){
    this.i18nService.loadTranslations(lang);
    this.lang = lang;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class I18nService {
  translations: Record<string, string> | null = null;
  currentLanguage: 'en' | 'ar' = 'en';

  constructor(private http: HttpClient) {}

  async loadTranslations(lang: 'en' | 'ar'): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.get<Record<string, string>>(`assets/i18n/${lang}.json`)
      );
      console.log('Loaded translations:', res);
      this.translations = res;
      this.currentLanguage = lang;
      localStorage.setItem('lang', 'en');
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      return true;
    } catch {
      return false;
    }
  }
  t(key: string): string {
    if (!this.translations) return key;
    const keys = key.split('.');
    let value: unknown = this.translations;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, string>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }
  getLanguage(): 'en' | 'ar' {
    return this.currentLanguage;
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { firstValueFrom } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class I18nService {
//   constructor(private http: HttpClient) {}

//   currentLanguage: 'en' | 'ar' = 'en';
//   // private translations: Record<string, any> | null = null;
//   private translations: Record<string, string> | null = null;

//   // loadTranslations(){ return Promise ((resolve, reject)=>{ }) } // missing code
//   async loadTranslations(lang: 'en' | 'ar'): Promise<boolean> {
//     try {
//       const res = await firstValueFrom(
//         this.http.get<Record<string, string>>(`assets/i18n/${lang}.json`)
//       );
//       console.log('Loaded Translations: ' + res);

//       this.translations = res;
//       this.currentLanguage = lang;

//       localStorage.setItem('lang', lang);
//       document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
//       return true;
//     } catch (error) {
//       console.log('errr Loading Translation:', error);
//       return false;
//     }
//   }

//   getLanguage() {
//     return this.currentLanguage;
//   }

//   // t(key: string): string {
//   //   if (!this.translations) {
//   //     console.error('Translations are not Loaded yet');
//   //     return key;
//   //   }
//   //   const keys = key.split('.');
//   //   let value: unknown = this.translations;
//   //   for (const k of keys) {
//   //     if (typeof value === 'object' && value !== null && k in value) {
//   //       value = value[k];
//   //     } else {
//   //       console.error(`Translation key "${key}" Not Found`);
//   //       return key;
//   //     }
//   //   }
//   //   console.log('Translation for', key, ':', value);
//   //   return typeof value === 'string' ? value : key;
//   // }

//   t(key: string): string {
//     if (!this.translations) return key;
//     const keys = key.split('.');
//     let value: unknown = this.translations;
//     for (const k of keys) {
//       if (typeof value === 'object' && value !== null && k in value) {
//         value = (value as Record<string, unknown>)[k];
//       } else {
//         return key;
//       }
//     }
//     return typeof value === 'string' ? value : key;
//   }

//   setLanguage(language: 'en' | 'ar') {
//     this.currentLanguage = language;
//   }
// }

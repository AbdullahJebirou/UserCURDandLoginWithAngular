import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})
export class SelectLanguageComponent {
  constructor(private translateService: TranslateService) { }
  
  LangArray = [{ name: "English", value: "en" },
  { name: "Arabic", value: "ar" }]
  Lang: string = "English";

  changeLang() {
    this.translateService.use(this.LangArray.find(n => n.name == this.Lang)?.value!);
  }
}

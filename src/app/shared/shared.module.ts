import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/components/pagination.component';
import { AlertComponent } from './alert/components/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SelectLanguageComponent } from './select-language/select-language.component';

@NgModule({
  declarations: [PaginationComponent, AlertComponent, SelectLanguageComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    PaginationComponent,
    AlertComponent,
    SelectLanguageComponent,
    FontAwesomeModule,
  ],
})
export class SharedModule {}

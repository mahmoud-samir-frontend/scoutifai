import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalDemoDataService } from './services/local-demo-data.service';
import { LanguageService } from './services/language.service';
import { ApiLoadingService } from './services/api-loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SCOUTIFAI';
  constructor(
    demoData: LocalDemoDataService,
    _language: LanguageService,
    public apiLoading: ApiLoadingService
  ) { demoData.initialize(); }
}

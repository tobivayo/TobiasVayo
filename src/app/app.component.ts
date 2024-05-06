import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AlertComponent } from './shared/components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContentLayoutComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TobiasVayo';
}

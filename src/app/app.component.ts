import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContentLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TobiasVayo';
}

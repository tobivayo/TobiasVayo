import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css'
})
export class ContentLayoutComponent {

}

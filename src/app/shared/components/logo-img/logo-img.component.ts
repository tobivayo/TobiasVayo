import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-img',
  standalone: true,
  imports: [],
  templateUrl: './logo-img.component.html',
  styleUrl: './logo-img.component.css'
})
export class LogoImgComponent {
  @Input() imgSrc: string = '';

}

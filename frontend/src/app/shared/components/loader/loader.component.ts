import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
@Input() shade: boolean = false;
@Input() spinner: boolean = false;
@Input() loader: boolean = false;
}

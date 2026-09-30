import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Citas } from './citas/citas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Citas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barberia-frontend');
}
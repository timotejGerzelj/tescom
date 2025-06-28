import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateItem } from "./views/create-item/create-item";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  protected title = 'frontend';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateItem } from "./views/create-item-view/create-item-view";
import { Navbar } from "./views/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html'
})
export class App {
  protected title = 'frontend';
}

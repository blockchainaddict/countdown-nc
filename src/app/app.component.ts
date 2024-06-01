import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FrontendChallenge';
}

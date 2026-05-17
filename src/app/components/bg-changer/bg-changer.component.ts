import { Component } from '@angular/core';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-bg-changer',
  standalone: false,
  templateUrl: './bg-changer.component.html',
  styleUrl: './bg-changer.component.scss'
})
export class BgChangerComponent {
  bgChangerUrl = environment.remotes.bgChanger;

}

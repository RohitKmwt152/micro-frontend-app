import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  toDoUrl = environment.remotes.todoApp;
}

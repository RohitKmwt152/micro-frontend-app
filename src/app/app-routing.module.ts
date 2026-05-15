import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './components/print/print.component';
import { TodoComponent } from './components/todo/todo.component';
import { BgChangerComponent } from './components/bg-changer/bg-changer.component';

const routes: Routes = [
  { path: '', redirectTo: '/print', pathMatch: 'full' },
  { path: 'print', component: PrintComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'bg-changer', component: BgChangerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

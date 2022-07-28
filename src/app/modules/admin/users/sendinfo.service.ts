import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendinfoService {
  //Shooter guarda la informacion del nuevo post para guardarla en otro componente
  @Output() Shooter: EventEmitter<any> = new EventEmitter();
  //showform almacena un booleano que controla si el formulario se esta mostrando o no
  public showForm = new BehaviorSubject(false);
  constructor() { }
}

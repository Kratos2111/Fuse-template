import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../users.service';
import { IUsers } from '../users/users.component';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  //formgroup para controlar los valores de form
  public profileInfo = this.Form.group ({
    id: [''],
    name: [''],
    username: [''],
    email: [''],
    address: this.Form.group({
      street: [''],
      suite: [''],
      city: [''],
      zipcode: [''],
      geo: this.Form.group({
        lat: [''],
        lng: ['']
      })
    }),
    phone: [''],
    website: [''],
  })

  //declaracion de variables y tipos de datos
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  public user: IUsers;  
  public isEditing = false;
  public dialogRef: MatDialogRef<FuseConfirmationDialogComponent>;

  constructor(
    private userService: UsersService,
    private route: Router,
    private activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private FuseConfirmationService: FuseConfirmationService,
    private Form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe( (value: any) => {
      //confirma si vamos a actualizar o agregar regritos
      if(value.id !== 'add'){
          this.userService.getUsers('https://jsonplaceholder.typicode.com/users/' + value.id).pipe(
          takeUntil(this._unsubscribe)
          ).subscribe((Response) => {
          this.user = Response;
          this.profileInfo.patchValue(this.user);
        })
      }else{
        //llenamos el formgroup para poder acceder a ellos despues
        this.isEditing = true;
      }
     })
  }
  //actualiza el servidor REST
  accion(){
    //revisamos si estamos actualizando o agregando un registro
      if(!this.isEditing){
        this.userService.updateUser('https://jsonplaceholder.typicode.com/posts/' + this.user.id,this.user).
        pipe(takeUntil(this._unsubscribe)).subscribe(
          (value: any) => {
            this.user = value;
            this.profileInfo.patchValue(this.user);
            this.openSnackBar('success','Updated', 'You data is correcty missed'); 
          }
        )
      }
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.subscribe();
  }
  //regresa a la pagina anterior
  goBack(){
    this.route.navigate(['/users']);
  }
  //abre el snackbar al confirmar la acción
  openSnackBar(type: string, title: string, message: string){
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      data: {
        type,title,message
      },
      duration: 3000,
      panelClass: ['bg-transparent', 'border-none', 'shadow-none']  
    })
  }
  //abre la caja de dialogo para confimar la accion
  openDialog(){
    this.dialogRef = this.FuseConfirmationService.open({
      title: 'Alert!!',
      message: 'Sure?',
    })
  }
  //metodo REST para borrar en la API
  deleteUser(){
    this.openDialog();
    this.dialogRef.afterClosed().subscribe( (result) => {
      if(result === 'confirmed'){
        this.userService.deleteUser('https://jsonplaceholder.typicode.com/posts/' + this.user.id).pipe(takeUntil(this._unsubscribe)).subscribe(
          () => {
            this.openSnackBar('success','Done','the user information has been deleted');
          }
        ) 
      }
    })
  }
}

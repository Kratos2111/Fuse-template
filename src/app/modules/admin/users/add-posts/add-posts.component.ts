import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { SendinfoService } from '../sendinfo.service';
@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit {
  public postInfo = this.Form.group({
    userId: [{value: '', disabled: true}],
    Id: [{value: '', disabled: true}],
    title: ['', Validators.required],
    body: ['', Validators.required]
  });
  @Input() item;
  constructor(
    private Form: FormBuilder,
    private service: SendinfoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  //llama a shooter dentro del servico para emitir la info del nuevo post
  addPosts(){
    this.service.Shooter.emit(this.postInfo.value);
    this.openSnackBar('success','Done','Post saved')
    this.hidePost();
  }
  openSnackBar(type: string, title: string, message: string){
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
          type,
          title,
          message
      },
      duration: 3000,
      panelClass: ['bg-transparent', 'border-none', 'shadow-none']  
    })
  }
  //oculta el form cuando el usuario agrega uno nuevo
  hidePost(){
    this.service.showForm.next(false);
  }
}

import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SendinfoService } from '../sendinfo.service';
@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit {
  public postInfo = this.Form.group({
    userId: [{value: '', disabled: true}],
    Id: ['', Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required]
  });
  constructor(
    private Form: FormBuilder,
    private service: SendinfoService,
  ) { }

  ngOnInit(): void {
  }
  //llama a shooter dentro del servico para emitir la info del nuevo post
  addPosts(){
    this.service.Shooter.emit(this.postInfo.value);
  }
  //oculta el form cuando el usuario agrega uno nuevo
  hidePost(){
    this.service.showForm.next(false);
  }
}

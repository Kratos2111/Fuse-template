import { Component, OnInit, OnDestroy} from '@angular/core';
import { UsersService } from '../users.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SendinfoService } from '../sendinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostsComponent } from '../add-posts/add-posts.component';
export interface PostForms {
  userId: string,
  Id: string,
  title: string,
  body: string
}
@Component({
  selector: 'app-postsview',
  templateUrl: './postsview.component.html',
  styleUrls: ['./postsview.component.scss']
})
export class PostsviewComponent implements OnInit, OnDestroy {
  public Posts: PostForms[] = [];
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  public path: PostForms;
  public isToggle = false;
  public isAddToggle = false;
  public User;
  public selected: PostForms = {
    userId: '',
    Id: '',
    title: 'Select a post',
    body: 'choose a post to view him info'
  };
  public showForm = false;
  constructor(
    private userservice: UsersService,
    private activedRoute: ActivatedRoute,
    private sendInfoService: SendinfoService,
    private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    //suscribe al servicio para obtener los datos de la API
    this.activedRoute.params.subscribe( (item: any) =>{
      this.userservice.getUsers('https://jsonplaceholder.typicode.com/users/' + item.id + '/posts').pipe(takeUntil(this._unsubscribe)).subscribe(
        (value: any) => {
          this.Posts = value;
          this.User = this.Posts[0].userId;
        }
      )
    })
    //se suscribe al servicio sendInfo showForm para saber si el formularios se esta mostrando
    this.sendInfoService.showForm.subscribe( (value) => {this.showForm = value})
  }
  //abre formulario para agregar posts
  openDialog(){
    this.sendInfoService.Shooter.pipe(takeUntil(this._unsubscribe)).subscribe(
      (value) => {
        this.Posts.push(value);
      }
    )
  }
  //abre o cierra el sidenav cambia su valor booleano
  activateButtom(){
   this.isToggle = !this.isToggle
  }
  //actualiza si el addForm se esta mostrando o no
  updateBs(){
    this.sendInfoService.showForm.next(true);
  }
  //guarda el id del post seleccionado
  callDetail(id: PostForms){
    this.selected = id;
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}   
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { UsersService } from '../users.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
export interface IUsers{
  id: string,
  name: string,
  username: string,
  email: string,
  address?: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public filterControl = new FormControl('');
  public fillOptions: Observable<string[]>;
  public users: IUsers[] = [];
  public displayedColumns: string[] = [ 'id','name', 'username', 'email' , 'phone', 'website'];
  public dataSource = new MatTableDataSource<IUsers>;
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  public options: string[] = ['Id','Name','username'];
  public optionscomplete: string[] = ['0','Ervin','Samantha','Kamrem','Glenna']
  public selectedValue: string;
  public filteredData: any;
  public selectedRow: string;
  constructor(
    private userservice: UsersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    
    //get al servidor
    this.userservice.getUsers('https://jsonplaceholder.typicode.com/users').pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((value: any) => {
      this.users = value;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    })
    //autocomplete
    this.fillOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.subscribe();
  }
  //enlaza al componente details
  handleRow(id: string){
    this.router.navigate([id],{relativeTo: this.activeRoute});
  }
  handleAdd(){
    this.router.navigate(['add'],{relativeTo: this.activeRoute});
  }
  //guarda la fila seleccionada
  handleRowTable(id: string){
    this.selectedRow = id;
  }
  //llamar al detailpost
  callPost(id: string){
    this.router.navigate([id, 'posts'], {relativeTo: this.activeRoute})     
  }

  //redirecciona al postview
  handleView(id: string){
    this.router.navigate([`${id}/posts`],{relativeTo: this.activeRoute});
  }
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionscomplete.filter(option => option.toLowerCase().includes(filterValue));
  }
  _filterdata(){
    switch(this.selectedValue){
      case 'username':
        this.filteredData = this.users.filter((item) => item.username === this.filterControl.value) ;
        this.filteredData = this.users.filter( (item) => item.username.includes(this.filterControl.value) ) ;
        this.dataSource = new MatTableDataSource( this.filteredData);
        break;
      case 'Name':
        this.filteredData = this.users.filter((item) => item.name === this.filterControl.value);
        this.filteredData = this.users.filter( (item) => item.name.includes(this.filterControl.value));
        this.dataSource = new MatTableDataSource( this.filteredData);
        break;
      case 'Id':
        this.filteredData = this.users.filter((item) => item.id === this.filterControl.value);
        this.filteredData = this.users.filter( (item) => item.id.includes(this.filterControl.value));
        this.dataSource = new MatTableDataSource( this.filteredData);
        break;
    }
  }
  
}

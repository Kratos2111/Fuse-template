import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() item;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {   
  }
  goBack(){
    this.router.navigate(['../']);    
  } 

}

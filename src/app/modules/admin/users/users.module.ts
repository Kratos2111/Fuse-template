import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component'; 
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PostsviewComponent } from './postsview/postsview.component';
import {MatCardModule} from '@angular/material/card';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddPostsComponent } from './add-posts/add-posts.component';
import {MatListModule} from '@angular/material/list'; 
import { MatDialogModule } from '@angular/material/dialog';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseConfirmationModule } from '@fuse/services/confirmation';

const usersRoutes: Route[] = [
  {
      path     : '',
      component: UsersComponent,
  },
  {
    path     : ':id/posts',
    component: PostsviewComponent,
    children: [
      {
      path      : 'details',
      component: PostDetailComponent
      }
    ]
  },
  {
      path     : ':id',
      component: UserDetailsComponent
  },
  {
      path     : 'add',
      component: UserDetailsComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    CustomSnackbarComponent,
    PostsviewComponent,
    PostDetailComponent,
    AddPostsComponent,
  ],
  imports: [
    FuseConfirmationModule,
    FuseAlertModule,
    FuseAlertModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,    
    MatSnackBarModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    RouterModule.forChild(usersRoutes),
    MatTableModule,
    HttpClientModule,
    MatSortModule
  ]
})
export class UsersModule { }

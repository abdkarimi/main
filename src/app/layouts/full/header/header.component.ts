import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UserAuthService } from 'src/app/services/Auth/user-auth-service.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ImageService } from 'src/app/services/images/image.service';
import { LogoutService } from 'src/app/services/logout/logout.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  currentUser: Utilisateur;
  imgURL: any;

  constructor(public dialog: MatDialog,private dashboardService: DashboardService,private imageService: ImageService,private logoutService:  LogoutService,private authService: UserAuthService,private router: Router) {}
  ngOnInit(): void {
    this.getCurrentUser();
  }

  fetchUtilisatuerImage(currentUser: Utilisateur): void {
    this.imageService.fetchImage(currentUser.photo).subscribe(
      imageUrl => {
        this.imgURL = imageUrl; // Set the image URL for preview
      },
      error => {
        console.error('Error fetching article image:', error);
      }
    );
  }
  getCurrentUser(): void {
    this.dashboardService.navbar()
      .subscribe(user => {
        //console.log(user)
        this.currentUser = user;
        this.fetchUtilisatuerImage(user);
      });
  }
  logout(): void {
    this.logoutService.logout().subscribe(
      () => {
        this.authService.clear();
        this.router.navigate(['/authentication/login']); // Redirect to login page after successful logout
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }
}

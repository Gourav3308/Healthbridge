import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Healthbridge - Doctor Appointment System';
  
  ngOnInit() {
    console.log('=== ANGULAR APP COMPONENT INITIALIZED ===');
    console.log('Current URL:', window.location.href);
    console.log('Current path:', window.location.pathname);
    console.log('Current search:', window.location.search);
    console.log('App title:', this.title);
  }
}

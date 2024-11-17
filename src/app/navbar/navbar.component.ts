import { Component } from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
constructor(public router:Router) {
}

isActive(url:string){
  return url == this.router.url?'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white':'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
}
}

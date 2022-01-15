import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portals-td';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.navigate(['/home']);
  }
}

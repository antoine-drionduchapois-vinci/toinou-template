import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private readonly homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getHello();
    this.homeService.getUsers();
  }
}

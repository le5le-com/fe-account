import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OAuthComponent implements OnInit {
  github = 'https://github.com/login/oauth/authorize?client_id=251603d7a2c3acfe1648&scope=user&state=github';

  constructor() {}

  ngOnInit() {}
}

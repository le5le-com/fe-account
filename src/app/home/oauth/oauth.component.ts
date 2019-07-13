import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OAuthComponent implements OnInit {
  github = `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&scope=user&state=github`;

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article | undefined;
  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit() {
    this.dataSharingService.sharedData.subscribe((data: any) => {
      this.article = data;
    });
  }
}

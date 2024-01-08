import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [RepositoryService],
})
export class ShopComponent implements OnInit {
  shopObservable: Observable<Article[]> | undefined;
  articlesList: Article[] = [];
  capsList: Article[] = [];
  hoodiesList: Article[] = [];
  menList: Article[] = [];
  womenList: Article[] = [];
  childrenList: Article[] = [];

  article: Article | undefined;
  activeIndices: Set<number> = new Set<number>();

  constructor(
    private repositoryService: RepositoryService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.shopObservable = this.repositoryService.shop.valueChanges();
  }
  ngOnInit() {
    this.shopObservable?.subscribe((articleDoc: Article[]) => {
      this.articlesList = articleDoc;
      this.articlesList.forEach((articleDoc: Article) => {
        switch (articleDoc.product) {
          case 'cap':
            this.shopForm.controls['caps'].valueChanges.subscribe((val) => {
              if (val) {
                this.capsList.push(articleDoc);
              } else {
                this.capsList = [];
              }
            });
            break;
          case 'hoodie':
            this.shopForm.controls['hoodies'].valueChanges.subscribe((val) => {
              if (val) {
                this.hoodiesList.push(articleDoc);
              } else {
                this.hoodiesList = [];
              }
            });
            break;
        }
      });
    });

    this.shopForm.valueChanges.subscribe(() => {
      this.articlesList = [...this.capsList, ...this.hoodiesList];
    });
  }

  shopForm: FormGroup = new FormGroup({
    caps: new FormControl(false),
    hoodies: new FormControl(false),
    men: new FormControl(false),
    women: new FormControl(false),
    unisex: new FormControl(false),
  });

  showArticle(article: Article) {
    this.dataSharingService.setSharedData(article);
    this.router.navigate(['/article']);
  }

  toggleActive(index: number) {
    if (this.activeIndices.has(index)) {
      this.activeIndices.delete(index);
    } else {
      this.activeIndices.add(index);
    }
  }

  isActive(index: number): boolean {
    return this.activeIndices.has(index);
  }
}

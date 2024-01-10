import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../enums/enums';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [RepositoryService],
})
export class ShopComponent implements OnInit {
  shopObservable: Observable<Article[]> | undefined;
  articlesList: Article[] = [];
  menList: Article[] = [];
  womenList: Article[] = [];
  unisexList: Article[] = [];
  article: Article | undefined;
  category = Category;

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
        switch (articleDoc.targetAudience) {
          case 'men':
            this.shopForm.controls['men'].valueChanges.subscribe((val) => {
              if (val) {
                this.menList.push(articleDoc);
              } else {
                this.menList = [];
              }
            });
            break;
          case 'women':
            this.shopForm.controls['women'].valueChanges.subscribe((val) => {
              if (val) {
                this.womenList.push(articleDoc);
              } else {
                this.womenList = [];
              }
            });
            break;
          case 'unisex':
            this.shopForm.controls['unisex'].valueChanges.subscribe((val) => {
              if (val) {
                this.unisexList.push(articleDoc);
              } else {
                this.unisexList = [];
              }
            });
            break;
        }
      });
    });

    this.shopForm.valueChanges.subscribe(() => {
      this.articlesList = [
        ...this.menList,
        ...this.womenList,
        ...this.unisexList,
      ];
      const ArticlesSet = new Set<Article>(this.articlesList);
      this.articlesList = [...ArticlesSet];
    });
  }

  shopForm: FormGroup = new FormGroup({
    men: new FormControl(false),
    women: new FormControl(false),
    unisex: new FormControl(false),
    tshirts: new FormControl(false),
    hoodies: new FormControl(false),
    pants: new FormControl(false),
    shoes: new FormControl(false),
    caps: new FormControl(false),
    wristwears: new FormControl(false),
    mice: new FormControl(false),
    keyboards: new FormControl(false),
    headsets: new FormControl(false),
    candles: new FormControl(false),
    vases: new FormControl(false),
    lights: new FormControl(false),
  });

  handleCardClickAndFilter(category: Category) {
    switch (category) {
      case 'clothesCollection':
        this.shopForm.controls['tshirts'].setValue(true);
        this.shopForm.controls['hoodies'].setValue(true);
        this.shopForm.controls['pants'].setValue(true);
        this.shopForm.controls['shoes'].setValue(true);
        this.shopForm.controls['caps'].setValue(true);
        this.shopForm.controls['wristwears'].setValue(true);
        break;
      case 'gamingAccessory':
        this.shopForm.controls['mice'].setValue(true);
        this.shopForm.controls['keyboards'].setValue(true);
        this.shopForm.controls['headsets'].setValue(true);
        break;
      case 'homeBasic':
        this.shopForm.controls['candles'].setValue(true);
        this.shopForm.controls['vases'].setValue(true);
        this.shopForm.controls['lights'].setValue(true);
        break;
    }
  }
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

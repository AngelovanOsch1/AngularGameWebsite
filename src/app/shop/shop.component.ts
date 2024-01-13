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
  activeIndex: Set<number> = new Set<number>();
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
      this.articlesList.sort((a, b) => b.stock - a.stock);
      this.articlesList.forEach((articleDoc: Article) => {
        switch (articleDoc.targetAudience) {
          case 'men':
            this.shopForm.controls['men'].valueChanges.subscribe((val) => {
              if (val) {
                this.articlesList.push(articleDoc);
              } else {
                this.articlesList = [];
              }
            });
            break;
          case 'women':
            this.shopForm.controls['women'].valueChanges.subscribe((val) => {
              if (val) {
                this.articlesList.push(articleDoc);
              } else {
                this.articlesList = [];
              }
            });
            break;
          case 'unisex':
            this.shopForm.controls['unisex'].valueChanges.subscribe((val) => {
              if (val) {
                this.articlesList.push(articleDoc);
              } else {
                this.articlesList = [];
              }
            });
            break;
        }
      });
    });

    this.shopForm.controls['sortByFilter'].valueChanges.subscribe((val) => {
      switch (val) {
        case 'sortOnLowPrice':
          this.articlesList.sort((a, b) => a.price - b.price);
          break;
        case 'sortOnHighPrice':
          this.articlesList.sort((a, b) => b.price - a.price);
          break;
        case 'sortOnLowStock':
          this.articlesList.sort((a, b) => a.stock - b.stock);
          break;
        case 'sortOnHighStock':
          this.articlesList.sort((a, b) => b.stock - a.stock);
          break;
      }
    });

    // this.shopForm.valueChanges.subscribe(() => {
    //   this.articlesList = [
    //     ...this.menList,
    //     ...this.womenList,
    //     ...this.unisexList,
    //   ];
    //   const ArticlesSet = new Set<Article>(this.articlesList);
    //   this.articlesList = [...ArticlesSet];
    // });
  }

  shopForm: FormGroup = new FormGroup({
    sortByFilter: new FormControl('sortOnHighStock'),
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
        if (this.activeIndex.has(1)) {
          this.activeIndex.delete(1);
          this.shopForm.controls['tshirts'].setValue(false);
          this.shopForm.controls['hoodies'].setValue(false);
          this.shopForm.controls['pants'].setValue(false);
          this.shopForm.controls['shoes'].setValue(false);
          this.shopForm.controls['caps'].setValue(false);
          this.shopForm.controls['wristwears'].setValue(false);
        } else {
          this.activeIndex.add(1);
          this.shopForm.controls['tshirts'].setValue(true);
          this.shopForm.controls['hoodies'].setValue(true);
          this.shopForm.controls['pants'].setValue(true);
          this.shopForm.controls['shoes'].setValue(true);
          this.shopForm.controls['caps'].setValue(true);
          this.shopForm.controls['wristwears'].setValue(true);
        }
        break;
      case 'gamingAccessory':
        if (this.activeIndex.has(2)) {
          this.activeIndex.delete(2);
          this.shopForm.controls['mice'].setValue(false);
          this.shopForm.controls['keyboards'].setValue(false);
          this.shopForm.controls['headsets'].setValue(false);
        } else {
          this.activeIndex.add(2);
          this.shopForm.controls['mice'].setValue(true);
          this.shopForm.controls['keyboards'].setValue(true);
          this.shopForm.controls['headsets'].setValue(true);
        }
        break;
      case 'homeBasic':
        if (this.activeIndex.has(3)) {
          this.activeIndex.delete(3);
          this.shopForm.controls['candles'].setValue(false);
          this.shopForm.controls['vases'].setValue(false);
          this.shopForm.controls['lights'].setValue(false);
        } else {
          this.activeIndex.add(3);
          this.shopForm.controls['candles'].setValue(true);
          this.shopForm.controls['vases'].setValue(true);
          this.shopForm.controls['lights'].setValue(true);
        }
        break;
    }
  }
  showArticle(article: Article) {
    this.dataSharingService.setSharedData(article);
    this.router.navigate(['/article']);
  }

  toggleActive(index: number) {
    if (this.activeIndex.has(index)) {
      this.activeIndex.delete(index);
    } else {
      this.activeIndex.add(index);
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex.has(index);
  }
}

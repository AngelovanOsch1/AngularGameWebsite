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
  tshirtList: Article[] = [];
  hoodiesList: Article[] = [];
  pantsList: Article[] = [];
  shoesList: Article[] = [];
  capsList: Article[] = [];
  wristwearsList: Article[] = [];
  miceList: Article[] = [];
  keyboardsList: Article[] = [];
  headsetsList: Article[] = [];
  candlesList: Article[] = [];
  vasesList: Article[] = [];
  lightsList: Article[] = [];
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
        switch (articleDoc.product) {
          case 'tshirt':
            this.shopForm.controls['tshirt'].valueChanges.subscribe((val) => {
              if (val) {
                this.tshirtList.push(articleDoc);
              } else {
                this.tshirtList = [];
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
          case 'pant':
            this.shopForm.controls['pants'].valueChanges.subscribe((val) => {
              if (val) {
                this.pantsList.push(articleDoc);
              } else {
                this.pantsList = [];
              }
            });
            break;
          case 'shoe':
            this.shopForm.controls['shoes'].valueChanges.subscribe((val) => {
              if (val) {
                this.shoesList.push(articleDoc);
              } else {
                this.shoesList = [];
              }
            });
            break;
          case 'cap':
            this.shopForm.controls['caps'].valueChanges.subscribe((val) => {
              if (val) {
                this.capsList.push(articleDoc);
              } else {
                this.capsList = [];
              }
            });
            break;
          case 'wristwear':
            this.shopForm.controls['wristwears'].valueChanges.subscribe(
              (val) => {
                if (val) {
                  this.wristwearsList.push(articleDoc);
                } else {
                  this.wristwearsList = [];
                }
              }
            );
            break;
          case 'mouse':
            this.shopForm.controls['mice'].valueChanges.subscribe((val) => {
              if (val) {
                this.miceList.push(articleDoc);
              } else {
                this.miceList = [];
              }
            });
            break;
          case 'keyboard':
            this.shopForm.controls['keyboards'].valueChanges.subscribe(
              (val) => {
                if (val) {
                  this.keyboardsList.push(articleDoc);
                } else {
                  this.keyboardsList = [];
                }
              }
            );
            break;
          case 'headset':
            this.shopForm.controls['headsets'].valueChanges.subscribe((val) => {
              if (val) {
                this.headsetsList.push(articleDoc);
              } else {
                this.headsetsList = [];
              }
            });
            break;
          case 'candle':
            this.shopForm.controls['candles'].valueChanges.subscribe((val) => {
              if (val) {
                this.candlesList.push(articleDoc);
              } else {
                this.candlesList = [];
              }
            });
            break;
          case 'vase':
            this.shopForm.controls['vases'].valueChanges.subscribe((val) => {
              if (val) {
                this.vasesList.push(articleDoc);
              } else {
                this.vasesList = [];
              }
            });
            break;
          case 'light':
            this.shopForm.controls['lights'].valueChanges.subscribe((val) => {
              if (val) {
                this.lightsList.push(articleDoc);
              } else {
                this.lightsList = [];
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
        ...this.tshirtList,
        ...this.hoodiesList,
        ...this.pantsList,
        ...this.shoesList,
        ...this.capsList,
        ...this.wristwearsList,
        ...this.miceList,
        ...this.keyboardsList,
        ...this.headsetsList,
        ...this.candlesList,
        ...this.vasesList,
        ...this.lightsList,
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

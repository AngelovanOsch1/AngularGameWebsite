import { Component, OnInit } from '@angular/core';
import { Article, ShoppingCart, User } from '../interfaces/interfaces';
import { map, tap } from 'rxjs';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../enums/enums';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ViewportScroller } from '@angular/common';
import { UserAuthService } from '../services/user-auth-service.service';
import { increment } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponentComponent } from '../helper-components/warning-component/warning-component.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [RepositoryService, UserAuthService],
})
export class ShopComponent implements OnInit {
  articlesList: Article[] = [];
  articlesListOrderBy: Article[] = [];
  testList: Article[] = [];
  shoppingCartList: ShoppingCart[] = [];
  menList: Article[] = [];
  womenList: Article[] = [];
  unisexList: Article[] = [];
  article: Article | undefined;
  category = Category;
  activeIndex: Set<number> = new Set();
  currentPage: number | undefined;
  isRotated: boolean = false;
  selectedOption = 'Stock high>low';

  user: User | undefined;
  constructor(
    private firestore: AngularFirestore,
    private userAuthService: UserAuthService,
    private router: Router,
    private dialog: MatDialog,
    private viewportScroller: ViewportScroller
  ) {}
  async ngOnInit(): Promise<any> {
    this.user = await this.userAuthService.getLoggedInUser();
    this.firestore
      .collection('shop', (ref) => ref.orderBy('stock', 'desc'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Article;
            const id = a.payload.doc.id;
            return { id, ...data } as Article;
          })
        ),
        tap((article: Article[]) => {
          this.articlesList = article;
          this.testList = this.articlesList;
          this.changePage(1);
        })
      )
      .subscribe();

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
      this.changePage(1);
    });

    this.firestore
      .collection(`users/${this.user!.id}/shoppingcart`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ShoppingCart;
            const id = a.payload.doc.id;
            return { id, ...data } as ShoppingCart;
          })
        ),
        tap((shoppingCart: ShoppingCart[]) => {
          this.shoppingCartList = shoppingCart;
        })
      )
      .subscribe();

  this.shopForm.valueChanges.subscribe(() => {
    const selectedAudiences = ['men', 'women', 'unisex'].filter(
      (audience) => this.shopForm.controls[audience].value
    );
    const selectedProducts = [
      'tshirts',
      'hoodies',
      'pants',
      'shoes',
      'caps',
      'wristwears',
      'mice',
      'keyboards',
      'headsets',
      'candles',
      'vases',
      'lights',
    ].filter((product) => this.shopForm.controls[product].value);

    if (selectedAudiences.length > 0 && selectedProducts.length > 0) {
      this.articlesListOrderBy = this.articlesList.filter(
        (article) =>
          selectedAudiences.includes(article.targetAudience) &&
          selectedProducts.includes(article.product)
      );
    } else if (selectedAudiences.length > 0) {
      this.articlesListOrderBy = this.articlesList.filter((article) =>
        selectedAudiences.includes(article.targetAudience)
      );
    } else if (selectedProducts.length > 0) {
      this.articlesListOrderBy = this.articlesList.filter((article) =>
        selectedProducts.includes(article.product)
      );
    } else {
      this.articlesListOrderBy = this.articlesList;
    }
    
    this.testList = this.articlesListOrderBy;
  });
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
  handleCardClickAndFilter(category: Category): void {
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
  showArticle(article: Article): void {
    const encodedId = btoa(article.id ?? '');
    this.router.navigate(['article', encodedId]);
  }
  toggleActive(index: number): void {
    if (this.activeIndex.has(index)) {
      this.activeIndex.delete(index);
    } else {
      this.activeIndex.add(index);
    }
  }
  isActive(index: number): boolean {
    return this.activeIndex.has(index);
  }
  getStockClass(stock: number): string {
    if (stock < 10 && stock > 0) {
      return 'low-on-stock';
    } else if (stock == 0) {
      return 'out-of-stock';
    } else {
      return '';
    }
  }
  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    this.articlesListOrderBy = this.articlesList.slice(startIndex, endIndex);
    this.viewportScroller.scrollToAnchor('scroll-up-element');
  }
  selectOption(option: string) {
    this.selectedOption = option;
  }
  toggleSelectOption() {
    this.isRotated = !this.isRotated;
  }

  addToCart(event: Event, article: Article) {
    event.stopPropagation();

    if (!this.user) {
      this.dialog.open(WarningComponentComponent, {
        width: '250px',
        data: { text: 'Are you not logged in yet?', url: '/login' },
      });
    } else if (this.shoppingCartList.some((item) => item.id === article.id)) {
      this.firestore
        .collection(`users/${this.user!.id}/shoppingcart`)
        .doc(article.id)
        .update({
          quantity: increment(1),
        });
    } else {
      this.firestore
        .collection(`users/${this.user!.id}/shoppingcart`)
        .doc(article.id)
        .set({
          image: article.image,
          productName: article.productName,
          price: article.price,
          targetAudience: article.targetAudience,
          product: article.product,
          quantity: 1,
        });
    }
  }
}

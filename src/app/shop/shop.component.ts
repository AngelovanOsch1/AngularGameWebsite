import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [RepositoryService],
})
export class ShopComponent implements OnInit {
  shopObservable: Observable<Article[]> | undefined;
  articlesList: Article[] = [];
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
    });
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

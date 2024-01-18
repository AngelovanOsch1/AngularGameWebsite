import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage?: number;
  @Input() limit?: number;
  @Input() total?: number;
  @Output() changePage = new EventEmitter<number>();

  pageCount: number | undefined;

  get pages(): number[] {
    this.pageCount = Math.ceil(this.total! / this.limit!);
    const visiblePages = 3;

    const startPage = Math.max(
      1,
      this.currentPage! - Math.floor(visiblePages / 2)
    );
    const endPage = Math.min(this.pageCount, startPage + visiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }

  nextStep() {
    this.currentPage!++;
    this.changePage.emit(this.currentPage);
  }

  previousStep() {
    this.currentPage!--;
    this.changePage.emit(this.currentPage);
  }
}

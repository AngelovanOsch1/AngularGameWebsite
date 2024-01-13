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

  get pages(): number[] {
    const pageCount = Math.ceil(this.total! / this.limit!);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}

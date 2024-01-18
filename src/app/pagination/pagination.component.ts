import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage?: number;
  @Input() limit?: number;
  @Input() total?: number;
  pageCount: number | undefined;
  @Output() changePage = new EventEmitter<number>();

  get pages(): number[] {
    this.pageCount = Math.ceil(this.total! / this.limit!);
    return Array.from({ length: this.pageCount }, (_, index) => index + 1);
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

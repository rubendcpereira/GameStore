import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() page!: number;
  @Input() pageSize!: number;
  @Input() collectionSize!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  selectPage(page: string | number): void {
    this.pageChange.emit(+page || 1);
  }

  formatInput(input: HTMLInputElement): void {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}

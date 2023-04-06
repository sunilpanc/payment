import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent {
  @Input() amount!: number;
  @Input() paymentType!: string;
  @Input() id!: number;
  @Output() onDelete = new EventEmitter<string>();

  deletePayment() {
    this.onDelete.emit(this.paymentType);
  }
}

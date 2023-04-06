import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  totalPurchase: number = 0;
  cash: number | undefined = undefined;
  card: number | undefined = undefined;
  balance: number = 0;
  creditPoints: number = 0;
  reedemPoints: number = 0;
  payments: { amount: number; paymentType: string }[] = [
    { amount: 0, paymentType: 'Cash' },
    { amount: 0, paymentType: 'Card' },
  ];
  error: string | null = null;
  totalPaid: number = 0;
  onTotalPurchase(event: any) {
    console.log(event.target.value);
    this.totalPurchase = event.target.value;
    this.totalPaid = 0;
    this.balance = this.totalPurchase;
    this.payments[0].amount = 0;
    this.payments[1].amount = 0;
    this.creditPoints = 0;
    this.error = null;
    this.cash = undefined;
    this.card = undefined;
    this.reedemPoints = 0;
  }

  onPaid(type: string) {
    if (type === 'Cash') {
      const cash = this.cash ? this.cash : 0;
      this.cash = undefined;
      if (this.totalPurchase < this.totalPaid + cash) {
        this.error =
          'Please Enter Amount Less Than Or Equal To Total Purchase Amount';
        return;
      }
      this.payments[0].amount += cash;
      this.totalPaid += cash;
      this.balance = this.totalPurchase - this.totalPaid;
      this.creditPoints += cash * 0.2;
    } else {
      const card = this.card ? this.card : 0;
      this.card = undefined;
      if (this.totalPurchase < this.totalPaid + card) {
        this.error =
          'Please Enter Amount Less Than Or Equal To Total Purchase Amount';
        return;
      }
      this.payments[1].amount += card;
      this.totalPaid += card;
      this.balance = this.totalPurchase - this.totalPaid;
      this.creditPoints += card * 0.3;
    }
    console.log(this.payments);
    this.error = null;
  }

  deletePayment(type: string) {
    if (type === 'Cash') {
      this.totalPaid -= this.payments[0].amount;
      this.balance = this.totalPurchase - this.totalPaid;
      this.payments[0].amount = 0;
      this.creditPoints = 0.3 * this.payments[1].amount;
    } else {
      this.totalPaid -= this.payments[1].amount;
      this.balance = this.totalPurchase - this.totalPaid;
      this.payments[1].amount = 0;
      this.creditPoints = 0.3 * this.payments[0].amount;
    }
  }
  onClose() {
    this.error = null;
  }
  onReedemPoints() {
    if (this.creditPoints < 500) return;
    if (this.creditPoints > this.balance) {
      this.creditPoints -= this.balance;
      this.reedemPoints = this.balance;
      this.totalPaid += this.balance;
      this.balance = 0;
    } else {
      this.reedemPoints = this.creditPoints;
      this.totalPaid += this.creditPoints;
      this.balance -= this.creditPoints;
      this.creditPoints = 0;
    }
  }
}

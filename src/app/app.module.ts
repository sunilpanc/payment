import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PaymentListComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

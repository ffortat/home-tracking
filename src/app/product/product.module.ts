import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductLineComponent } from './add-product/product-line/product-line.component';
import { SharedMaterialModule } from '../../common/modules/shared-material.module';
import { ProductReceiptComponent } from './product-receipt/product-receipt.component';



@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    ProductLineComponent,
    ProductReceiptComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/product/product.model';
import { Company } from '../../../../core/company/company.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditModalComponent {
  @Input() element: Product | Company | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [''],
    });    
  }

  ngOnChanges() {
    if (this.element) {
      if (this.isProduct()) {
        this.form.addControl('product', new FormControl(''));
        this.form.addControl('department', new FormControl(''));
        this.form.addControl('description', new FormControl(''));
        this.form.addControl('price', new FormControl(''));
  
      }
      if (this.isCompany()) {
        this.form.addControl('suffix', new FormControl(''));
        this.form.addControl('catchPhrase', new FormControl(''));
        this.form.addControl('catchPhraseDescription', new FormControl(''));
        this.form.addControl('city', new FormControl(''));
        this.form.addControl('country', new FormControl(''));
  
      }
      this.form.patchValue(this.element);
    }
  }

  isProduct(): boolean {
    return this.element ? 'product' in this.element : false; //not very elegant, but will
  }

  isCompany(): boolean {
    return this.element ? 'suffix' in this.element : false;
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    }
  }

  onClose() {
    this.close.emit();
  }

  hasProperty(key: string): boolean {
    return this.element ? key in this.element : false;
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyServiceService } from '../property-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  pForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: PropertyServiceService,
  private dialog: MatDialogRef<AddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.pForm = this.fb.group({
      ptitle: '',
      pprice: '',
      plocation: '',
      pdetails: '',

    })
  }
  ngOnInit(): void {
  this.pForm.patchValue(this.data); 
  }
  FormSubmit() {
    if (this.pForm.valid) {
      if(this.data){
        this.service.updateproperty(this.data.id,this.pForm.value).subscribe({
          next: (val: any) => {
            alert("Property detail updated successfully")
            this.dialog.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      }else{
      this.service.addproperty(this.pForm.value).subscribe({
        next: (val: any) => {
          alert("Property added successfully")
          this.dialog.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
}

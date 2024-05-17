import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  rcForm: FormGroup;

  ngOnInit(): void {
    this.rcForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'email': new FormControl(null,Validators.required),
      'gender': new FormControl('male')
    })
  }

  onSubmit() {
    console.log(this.rcForm)
  }

}

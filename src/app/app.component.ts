import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  rcForm: FormGroup;
  forbiddenName = ['ann', 'james']
  ngOnInit(): void {
    this.rcForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkUserNameForbidded.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],this.checkForbiddenEmail.bind(this)),
      }),
      'hobbies': new FormArray([]),
      'gender': new FormControl('male')
    })
  }

  onSubmit() {
    console.log(this.rcForm)
  }

  //dynamically adding content in the form
  onAddHobby() {
    const newHobbie = new FormControl(null, Validators.required);
    (<FormArray>this.rcForm.get('hobbies')).push(newHobbie);
    console.log(this.rcForm.get('hobbies'));
  }

  get Controls() {
    return (<FormArray>this.rcForm.get('hobbies')).controls;
  }

  checkUserNameForbidded(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenName.indexOf(control.value) !== -1) {
      // this object will present in the error field of that control ,
      //in the form object when we submit
      return { 'usernameForbidden': true }
    }
    return null; // either return null or omit return but do not return {usernameForbidden : false}
  }

  checkForbiddenEmail(control: FormControl): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500)
    })
    return promise;
  }
}

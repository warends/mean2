import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';1

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html'
})
export class SigninComponent{
    constructor(private authService: AuthService, private router: Router) {}

    myForm: FormGroup;

    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    };

    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        console.log(user);
        this.authService.signin(user)
            .subscribe(
                data => {
                    console.log(data);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            )
        this.myForm.reset();
    }
}

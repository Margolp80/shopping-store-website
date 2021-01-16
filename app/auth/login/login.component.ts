import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 infoLoading:boolean=false;
 loginIsInvalid:boolean=false;

  constructor(private authServ:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      return;
    }
    this.infoLoading=true;
    const email=form.value.email;
    const password= form.value.password;
    this.authServ.login(email,password).subscribe(
      resData=>{
        console.log(resData);
        this.infoLoading=false;
        this.loginIsInvalid=false;
        this.simpleAlert();
        // this.authServ.userIsSignedIn=true;
        localStorage.setItem("User",email);

        this.router.navigate(['/cart']);
        form.reset();
        console.log(localStorage.getItem("User"));
        
      },
      error=>{
        console.log(error);
        this.infoLoading=false;
        this.loginIsInvalid=true;
      })
  }
  simpleAlert(){  
    Swal.fire(
      'You are successfully logged in!',
      '',
      'success'
    )
  }

}

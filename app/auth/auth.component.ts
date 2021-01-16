import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
infoLoading:boolean=false;
loginIsinValid:boolean=false;

  constructor(private authserv:AuthService,private dialog:MatDialog,private router:Router) { }
  onSubmit(form: NgForm) {
    
    if (!form.valid) {
      return;
    }
    this.infoLoading=true;
    const email=form.value.email;
    const password= form.value.password;
    this.authserv.signUp(email,password).subscribe(
      resData=>{
        console.log(resData);
        this.infoLoading=false;
        this.simpleAlert();
        this.loginIsinValid=false;
        this.router.navigate(['/login']);
        form.reset();
      },error=>{
        console.log(error);
        this.infoLoading=false;
        this.loginIsinValid=true;
      })
    
  
  }
  
  simpleAlert(){  
    Swal.fire(
      'Yore in!!',
      'user added successfully!',
      'success'
    )
  }

  

  ngOnInit(): void {
  }



}

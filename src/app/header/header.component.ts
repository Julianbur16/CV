import { Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  primaryEmail='';
  secondEmail='';
  formmessage: FormGroup;
  formModal: any;
  items={};


  constructor(private translate: TranslateService,private router:Router,private fm:FormBuilder, private httpClient: HttpClient) {
    this.formmessage=fm.group({
      fulname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
      confirmationmail: ['', Validators.required],
      subjects: ['', Validators.pattern("^[3]{1}[0-2]{1}[0-9]{8}$")],
      texttask: ['', Validators.required]
    });
  

  }
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  
  submitdata(){
    this.items={
      "name": this.formmessage.controls['fulname'].value,
      "email": this.formmessage.controls['mail'].value,
      "phone": this.formmessage.controls['subjects'].value,
      "message": this.formmessage.controls['texttask'].value
    };
    let url='https://apirestforcv-production.up.railway.app/api/clients';

    this.formmessage.reset();

    this.httpClient.post(url,this.items).subscribe(
      response => this.formModal.show(),
      error => console.error(error)
    );
    
 
  }

  Navegar(propiedad: string){
    if(propiedad == 'perfil'){
      this.router.navigate(['/Perfil']);  
    }

    if(propiedad == 'dibujo_mecanico'){
      this.router.navigate(['/Dibujo_mecanico']);  
    }

    if(propiedad == 'automation'){
      this.router.navigate(['/Automation']);  
    }

    if(propiedad == 'programation'){
      this.router.navigate(['/Programmation']);  
    }
  }

}


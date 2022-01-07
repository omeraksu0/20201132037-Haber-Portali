import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-kayitdetay',
  templateUrl: './kayitdetay.component.html',
  styleUrls: ['./kayitdetay.component.css']
})
export class KayitdetayComponent implements OnInit {
key:string;
secKayit: Kayit = new Kayit();
  constructor(
    public route:ActivatedRoute,
    public fbServis:FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p =>{
  this.key = p.key;
  this.KayitGetir();
    });
  }
  KayitGetir(){
    this.fbServis.KayitByKey(this.key).snapshotChanges().subscribe(data=>{
  const y={...data.payload.toJSON(), key: this.key };
  this.secKayit = (y as Kayit);
  
      });
    }
   }



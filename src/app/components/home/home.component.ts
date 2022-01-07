import { Sonuc } from './../../models/sonuc';
import { Uye } from './../../models/uye';
import { FbServisService } from 'src/app/services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adsoyad:string;
   uid:string;
   kayitlar:Kayit[];
   sonuc: Sonuc = new Sonuc();
   secUye: Uye = new Uye();
   secKayit:Kayit=new Kayit();

  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  
  
  ngOnInit() {
    var user=JSON.parse(localStorage.getItem("user"));
    this.uid=user.uid;
    this.adsoyad=user.displayName;
    this.KayitListele();
  }

  OturumKapat() {
  this.fbServis.OturumKapat().then(d => {
     localStorage.removeItem("user");
     this.router.navigate(['login']);   
    });
    }
    
    KayitListele(){
  this.fbServis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data=>{
    this.kayitlar = [];
    data.forEach(satir => {
const y={...satir.payload.toJSON(), key: satir.key };
this.kayitlar.push(y as Kayit);
    });
  });

    }
}

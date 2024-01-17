import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, RespuestaNoticias } from 'src/app/interfaces/interfaces';
import { GestionNoticiasLeerService } from 'src/app/services/gestion-noticias-leer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // Creo e inicializo un array vacío
  public listaNoticiasLeer: Article[] = [];
  //public lnl: Article[] = [];
  public notLeerPromesa: Promise<Article[]>;

  constructor(public gestionNoticiasLeerService: GestionNoticiasLeerService) {
    
    /*this.notLeerPromesa = this.gestionNoticiasLeerService.getNoticiasLeer();
    this.notLeerPromesa.then(datos=>{
      this.listaNoticiasLeer.push(...datos)
    });*/

    //this.SacarDatos();

    this.notLeerPromesa = this.gestionNoticiasLeerService.getNoticiasLeer();
    this.notLeerPromesa.then(datos=>{
      this.listaNoticiasLeer.push(...datos)
    });

  }

  /*async SacarDatos(){

    let respNoticiasObservable: Observable<RespuestaNoticias> = this.gestionNoticiasLeerService.getNoticiasLeer();
    respNoticiasObservable.subscribe( resp => {
      console.log("Noticias", resp);
      //this.listaNoticias.push(...resp.articles);
      this.GestionStorageService.setObject("noticias", resp.articles);
      //this.GestionStorageService.setObject("listanotisLeer", this.listaNotisLeer);
      this.notPromesa = this.gestionNoticiasLeerService.getNoticias();
      this.notPromesa.then(datos=>{
      this.listaNotis.push(...datos)
    });
    });
    

    //const storedArticlesString = await this.gestionNoticiasLeerService.getNoticiasLeer();
    //this.notLeerPromesa = this.gestionNoticiasLeerService.getNoticiasLeer();
    //const storedArticles: Article[] = JSON.parse(storedArticlesString.values);
    //this.listaNoticiasLeer = storedArticles;

    /*this.gestionNoticiasLeerService.getNoticiasLeer().then(storedArticlesString => {
      
        const storedArticles: Article[] = JSON.parse(storedArticlesString.articles);
        this.articles = storedArticles;
      
    });

  }*/
  
}
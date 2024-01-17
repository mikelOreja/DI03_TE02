//import { Article } from 'src/app/interfaces/interfaces';
import { StorageService } from './../../services/storage.service';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  //Declaramos y creamos el array de noticias vacío
  public listaNotis: Article[] = [];
  public listaNotisLeer: Article[] = [];
  public notPromesa: Promise<Article[]>
  public categoria: string = "";
  /*
   * Creamos un objeto {} Observable que estará vacío y será del tipo Observable<RespuestaNoticias>. En este caso estamos creando un objeto vacío no será null.
   *
   * Otra manera de hacer esto sería utilizar | null = null, de esta manera decimos que el objeto respuestaNoticiasObservable de tipo Observable<RespuestaNoticias>
   * puede ser null y lo inicializamos null.
   * 
   * Crearlo como global puede ser útil si utilizamos el observable en varios métodos.
  */
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> | null = null;

  //Añadimos HttpClient y el servicio en el constructor
  constructor(private restServer: HttpClient, public gestionNoticiasLeerService: GestionNoticiasLeerService, public GestionStorageService: StorageService) {
    //Incluso podríamos crear la llamada en el constructor si fuese necesario
    //this.respNoticiasObservable = this.leerArticulosFicheroHttp.get<RespuestaNoticias>("/assets/datos/articulos.json");
    this.leerArticulosApi();
    this.notPromesa = this.gestionNoticiasLeerService.getNoticias();
    this.notPromesa.then(datos=>{
    this.listaNotis.push(...datos)
    });
  }

  private leerArticulosApi(){

    //business entertainment general health science sports technology

    //this.cambioCategoria();
    //Hacemos uso de la función get de HttpClient para leer mediante la consulta a la API
    let respNoticiasObservable: Observable<RespuestaNoticias> = this.restServer.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?category=" + this.categoria +"&apiKey=7057a6d7d20344e896eac8a4c2ee1e2d");
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
  }

  cambioCategoria(eventoRecibido: any) {
    // El valor seleccionado se encuentra en event.detail.value
    this.categoria = eventoRecibido.detail.value;
    //console.log('Segmento seleccionado:', this.selectedSegment);
    this.leerArticulosApi();
  }
  // Comprueba si la noticia seleccionada (checked) está para leer o no
  /*async seleccionado(item: Article): Promise<boolean> {
    let indice: number = await this.gestionNoticiasLeerService.buscarNoticia(item);
    if (indice != -1) {
      return true;
    }
    return false; */
 // }

  // Cuando cambia el check, en función de su valor añade o borra la noticia del Storage
  async checkNoticia(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeerService.addNoticias(item);
    } else {
      //this.gestionNoticiasLeerService.borrarNoticia(item);
    }    
  }
}

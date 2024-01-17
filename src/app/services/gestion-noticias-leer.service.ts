import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private leerNoticias : Article[] = [];
  //private datos: Article[] = [];

  constructor(public GestionStorageService: StorageService) { }

  // Devuelve todas las noticias para mostrar guardadas en el Storage
  async getNoticias() {
    let notis: Article[] = await this.GestionStorageService.getObject("noticias")
    return notis ;
  }

  //Devuelve las noticias seleccionadas para leer del Storage
  async getNoticiasLeer() {
    let notisLeer: Article[] = await this.GestionStorageService.getObject("listaNotiLeer")
    return notisLeer ;
  }

  //Añade una nueva noticia al array para poder leer
  async addNoticias(noticia : Article){

      let noticiaString = JSON.stringify(noticia);
      noticia = JSON.parse(noticiaString);

      this.leerNoticias = [];

      this.leerNoticias.push(noticia);

      let notLeerPromesa = this.getNoticiasLeer();
      notLeerPromesa.then(datos=>{
      this.leerNoticias.push(...datos)
      
    })

      this.GestionStorageService.setObject("listaNotiLeer", this.leerNoticias);
    //}



    /*let notLeerPromesa = this.getNoticiasLeer();
    notLeerPromesa.then(datos=>{
      this.leerNoticias.push(...datos)
    });*/

    //if(datosPromesa) {
      //this.leerNoticias.push(noticia);
    //}
    
    //this.datos =await this.GestionStorageService.getObject("listaNotisLeer");
    /*let noticiaString = JSON.stringify(noticia);
    noticia = JSON.parse(noticiaString);
    //this.leerNoticias= this.datos.slice();
    this.leerNoticias.push(noticia);*/

    //let indice: Promise<number> = this.buscarNoticia(noticia);
    

    /*let articuloEncontrado: any = this.datos.find(
      function(noticiaComp) { 
        return JSON.stringify(noticia) == JSON.stringify(noticiaComp);
      }
    );*/
    //const indice = this.datos.findIndex(articuloEncontrado);
    //const arrayArticulos: Article[] = JSON.parse(datosPromesa);
    //const indice = arrayArticulos.findIndex(articuloEncontrado);
    
    /*if(await indice==-1){
      //this.GestionStorageService.removeItem("listaNotisLeer");
      this.GestionStorageService.setObject("listaNotiLeer", this.leerNoticias);
    }*/
    

    //this.GestionStorageService.removeItem("leerNoticias");
    //this.GestionStorageService.setObject("leerNoticias", this.leerNoticias);

  }


  /*async obtenerArrayDesdeStorage(clave: string): Promise<any[]> {

    let value  = await this.GestionStorageService.getObject(clave);

    if (value  === "[]") {
      // Si la cadena es "[], convertirla a un array vacío
      return [];
    } else if (value ) {
      // Si hay datos válidos, convertir la cadena JSON a un objeto JavaScript
      return JSON.parse(value );
    } else {
      // Si no hay datos, devolver un array vacío
      return [];
    }
  }*/

  /* Comprueba si una noticia ya está en el array.
   * Mediante find vamos recorriendo todo el array hasta encontrar un objeto noticia que coincida con el objeto item que viene desde tab1.page.ts -> seleccionado()
   */
  /*buscarNoticia(item: Article): number  {
    let articuloEncontrado: any = this.leerNoticias.find(
      function(noticia) { 
        return JSON.stringify(noticia) == JSON.stringify(item);
      }
    );
    let indice = this.leerNoticias.indexOf(articuloEncontrado);
    return indice;
  }*/


  async buscarNoticia(item: Article): Promise<number> {
      //let datosBuscar: Article[] = await this.GestionStorageService.getObject("leerNoticias");
      let datosBuscar = await this.getNoticiasLeer();
    
      if (!datosBuscar) return -1; // Si no hay datos en el almacenamiento, devolvemos -1

      //datosBuscar.then
      let articuloEncontrado: any = datosBuscar.find(
        function(noticia) { 
          return JSON.stringify(noticia) == JSON.stringify(item);
        }
      );
      
      let indice = datosBuscar.findIndex(articuloEncontrado);
      //const arrayArticulos: Article[] = JSON.parse(datos);
      //const indice = datos.findIndex(articulo => this.sonIguales(articulo, item));
      
      return indice;
  }

  
  async obtenerArrayDesdeStorage(clave: string): Promise<any[]> {
  
      let value  = await this.GestionStorageService.getObject(clave);

      if (value === "[]") {
        // Si la cadena es "[], convertirla a un array vacío
        return [];
      } else if (value) {
        // Si hay datos válidos, convertir la cadena JSON a un objeto JavaScript
        return JSON.parse(value);
      } else {
        // Si no hay datos, devolver un array vacío
        return [];
      }
   
  }

  // Borra una noticia del array
  /*borrarNoticia(item: Article) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.leerNoticias.splice(indice, 1);
    }
  }*/

}

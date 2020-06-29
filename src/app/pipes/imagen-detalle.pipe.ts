import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagenDetalle'
})
export class ImagenDetallePipe implements PipeTransform {

  transform(img: string,  tipo: string = 'basuras'): any {
    let url = URL + '/image';

    if ( !img ) {
      return url + '/basuras/xxx';
    }

    switch (tipo) {
      case 'checklist-thumbnail':
        url += '/checklist-thumbnail/' + img;
      break;
      
      case 'checklistInstance-content':
        url += '/checklistInstance-content/' + img;
      break;

      case 'incident':
        url += '/incident/' + img;
      break;

      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'basuras':
        url += '/basuras/' + img;
        break;

      case 'imgcontenedor':
        url += '/imgcontenedor/' + img;
        break;

      case 'imgdetalle':
        url += '/imgdetalle/' + img;
        break;

      case 'imgLocal':
        url = img;
        break;

      default:
      console.log('Tipo de imagen no existe, usuarios, basuras, imgcontenedor, imgdetalle, imgLocal');
      url += '/basuras/xxx';
    }
    return url;
  }
}



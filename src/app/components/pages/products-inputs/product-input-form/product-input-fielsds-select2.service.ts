import { Injectable, ElementRef } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { environment } from '../../../../../environments/environment';

declare const $;

@Injectable({
  providedIn: 'root'
})
export class ProductInputFieldsSelect2Service {

  data;
  options: Select2Options;
  select2Element: ElementRef

  constructor(private authService: AuthService) { }

  
  /**
   * Pegar  Modal
   */
  get divModal(){
    const modalElement = this.select2Native.closest('modal');
    return modalElement.firstChild;
  }

  get select2Native():HTMLElement{
      return this.select2Element.nativeElement;
  }

  make(select2Element: ElementRef){
    this.select2Element = select2Element;
    this.options = {
        maximumInputLength: 3, // Número de caracteries minimo para busca
        dropdownParent: $(this.divModal),
        theme: 'bootstrap4',
        ajax: {
          headers: {
            'Accept': 'application/json',
            'Authorization': this.authService.authorizationHeader
          },
          url: `${environment.api.url}/products`,
          data(params){
            return {
              search: params.term
            }
          },
          processResults(data){ // data: [{id,name,etc}]
            return {
              results: data.data.map((product) => {
                return {id: product.id, text: product.name} //se quiser caixa alta é aqui
              })
            }
          }
        }
    }
    this.data = [];
  }

}

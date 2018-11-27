import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebaseConfig from './firebase-config';
import * as firebase from 'firebase';
import scriptjs from 'scriptjs';
import { filterQueryId } from '@angular/core/src/view/util';

declare const firebaseui;
//firebase reconhecer window
(<any>window).firebase = firebase;

@Injectable({
   providedIn: 'root'
})
export class FirebaseAuthService {

  private ui;

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  /**
   * Retorna o firebase
   */
  get firebase(){
    return firebase;
  }

  /**
   * await - só permite qua as proximas linhas sejam execultadas 
   * depois que a promessa foi resolvida.
   * @param selectorElement 
   */
  async makePhoneNumberForm(selectorElement: string){
    const firibaseui = await this.getFirebaseUI().then();
    // proximas linhas 
    const uiConfig = {
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            //console.log(authResult);
            //console.log(redirectUrl);
            return false;
        }
      }
    }

    this.makeFormFirebaseUi(selectorElement, uiConfig);

  }


  private makeFormFirebaseUi(selectorElement, uiConfig){
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start(selectorElement, uiConfig);
    } else {
      this.ui.delete().then(() => {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start(selectorElement, uiConfig);  
      })
    }
  }

  /**
   * Carregar script de tradução para pt
   */
  private async getFirebaseUI(): Promise<any>{
    return new Promise((resolve, regect) => {
      if(window.hasOwnProperty('firebaseui')) { // evitar carregar script externo novamente
        resolve(firebaseui);
        return
      }
      scriptjs('https://www.gstatic.com/firebasejs/ui/3.4.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui)
      });
    });
  }

  async getToken(): Promise<string>{
    try {
      const user = await this.getUser();
      if (!user) {
        throw new Error('Usuario não existe');
      }
      
      const token = await user.getIdTokenResult(); 
      return token.token;

    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Retorna dados do user no callback 
   * unsubscribed() destroi a inscrição da função (execulta só uma vez)
   */
  getUser(): Promise<firebase.User | null> {
    const currentUser = this.getCurrentUser();
    if(currentUser) {
      return Promise.resolve(currentUser);
    }
    return new Promise((resolve,reject) => {
      const unsubscribed = this.firebase
          .auth()
          .onAuthStateChanged((user) => {
            resolve(user);
            unsubscribed();
          },(error) => {
              reject(error);
              unsubscribed();
          });
    });
  }

  /**
   * Verifica se já existe um usuário
   * @returns user | null
   */
  private getCurrentUser(): firebase.User | null{
    return this.firebase.auth().currentUser;
  }

  /**
   * Destroi as informações mas preserva o banco de dados fo firebase.   * 
   */
  logout(): Promise<any>{
    return this.firebase.auth().signOut();
  }

}
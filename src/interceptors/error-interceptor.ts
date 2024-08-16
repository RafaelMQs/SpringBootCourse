import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { StorageService } from "../services/storage.service";
import { AlertController } from "@ionic/angular";
import { FieldMessage } from "../models/fieldmessage";
import { error } from "protractor";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService, public alertController: AlertController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(error => {

          let errorObj = error;

            if (errorObj.error) {
                errorObj = errorObj.error;
            }
          console.log("Erro detectado pelo interceptor")
          console.log(error)

          switch (error.status) {
            case 401:
              this.handle401();
              break;

            case 403:
              this.handle403();
              break;

            case 422:
              this.handle422(errorObj);
              break;

            default:
              this.handleDefaultError(errorObj);
              break;
          }

          return throwError(errorObj);
        })) as any;
  }

  async handle401() {
    const alert = await this.alertController.create({
      header: 'Erro 401: Falha de autenticação',
      message: 'Email ou senha inválidos',
      buttons: ['OK']
    });

    await alert.present();
  }

  async handle422(errorObj) {
    const alert = await this.alertController.create({
      header: 'Erro 422: Validação',
      message: this.listErrors(errorObj.errors),
      buttons: ['OK']
    });

    await alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  async handleDefaultError(errorObj) {
    const alert = await this.alertController.create({
      header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      buttons: ['OK']
    });

    await alert.present();
  }


  private listErrors(messages: FieldMessage[]): string {
    let s: string = '';
    for (var i = 0; i < messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};


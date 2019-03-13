import { Injectable } from '@angular/core';

@Injectable()
export class ErrorCustomProvider {

  constructor() { }

  static getBetterMessage(error: Error): string {
    switch(error.name) {
      case 'HttpErrorResponse':
        return 'Le point d\'accès désiré n\'est pas disponible.'
      default:
        return error.message
    }
  }

}

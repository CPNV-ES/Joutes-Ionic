import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable()
export class NetworkProvider {

  constructor(private network: Network) {
    
  }

}

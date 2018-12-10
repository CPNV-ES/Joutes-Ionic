# Joutes Ionic

Author : Benjamin Delacombaz

Last modification : 10.12.2018

Version : 0.0.1

## Custom toast

This documentation will explain how i made a custom toast component and how to use it.

The component file is located here: `/components/toast-custom/toast-custom.ts`

## Create component

To create my custom toast I've created a `.ts` file in the components folder.

```typescript
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastCustom {

  constructor(private toastCtrl: ToastController) {
  }

}
```

After that, I've added my class to the `app.module.ts` file.

```typescript
import { ToastCustom } from '../components/toast-custom/toast-custom';

...

providers: [
        ToastCustom
    ]
```

Now the component can be used everywhere.

## Using the component

Import the component in your page.

```typescript
import { ToastCustom } from '../../components/toast-custom/toast-custom'
```

After that, you can use the custom toast component.

```typescript
this.toastCustom.showToast(message: string, duration: number, type: string, closeButton: boolean)
```

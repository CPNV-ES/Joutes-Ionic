# Joutes Ionic

Author : Benjamin Delacombaz

Last modification : 08.03.2019 11:45

Version : 1.0.0

## Error custom provider

This documentation will explain how works the error custom provider.

If you have an error you don't like the default message, you can use the error custom provider.

### Usage

```javascript
import { ErrorCustomProvider } from '../../providers/error-custom';
// ...
try {
  // ...
} catch (error) {
  // Without error custom provider
  console.log(error.message) // Bad error message
  // With error custom provider
  console.log(ErrorCustomProvider.getBetterMessage(error)) // Good error message
}
```
You can use this provider everywhere because if you don't have created the custom message the provider will return you the normal message.
```javascript
static getBetterMessage(error: Error): string {
  switch(error.name) {
    // ...
    default:
      return error.message
  }
}
```

### Create own error custom

* In `/providers/error-custom.ts`, just add a case with the name of your error.
```javascript
static getBetterMessage(error: Error): string {
  switch(error.name) {
    // ...
    case 'YourErrorName':
      return 'Your custom error message'
    // ...
  }
}
```

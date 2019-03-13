# Joutes Ionic
Author : Kevin Jordil

Last Modification : 08.03.2019 12:00

Version 1.0.0

## Routes provider

This documentation explains how to use the route provider

In your page import the route provider:
```ts
import { RoutesProvider } from 'path/providers/routes';
```
Declare it
```ts
constructor([...], private routesProvider: RoutesProvider){}
```
Use it, examples: 
```ts
// Simple
let eventRoute = await this.routesProvider.get("events.index")
// In request
return this.http.get(await this.routesProvider.get("events.index")).toPromise()
// With one parameter
this.routesProvider.get("events.tournaments.index",{"event": 1})
// With many parameters
this.routesProvider.get("events.tournaments.pools.show",{"event": 1, "tournament": 2, "pool": 3})
```

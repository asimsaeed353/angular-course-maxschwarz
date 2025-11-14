import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
/* the above approach for providing dependency service to another service is the best because unlike components, Providing services in component providers does not allow injection into other services due to injector scope differences. Because Service does not follow the Service Providing Hierarchy and looks in the   */
export class LogService {
  log(message: string) {
    const timeStamp = new Date().toLocaleDateString();
    console.log(`[${timeStamp}]: ${message}`);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  private size:BehaviorSubject<number> = new BehaviorSubject<number>(50)
  _size:Observable<number> = this.size.asObservable(); 

  constructor() { }

  updateSize(size){
    console.log(size)
    this.size.next(size);
  }
}

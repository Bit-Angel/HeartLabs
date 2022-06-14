import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  private size:BehaviorSubject<number> = new BehaviorSubject<number>(50)
  private size2:BehaviorSubject<number> = new BehaviorSubject<number>(20)
  private size3:BehaviorSubject<number> = new BehaviorSubject<number>(23)
  private size4:BehaviorSubject<number> = new BehaviorSubject<number>(16)
  _size:Observable<number> = this.size.asObservable(); 
  _size2:Observable<number> = this.size2.asObservable();
  _size3:Observable<number> = this.size3.asObservable();
  _size4:Observable<number> = this.size4.asObservable();

  constructor() { }

  updateSize(size,size2,size3,size4){
    this.size.next(size);
    this.size2.next(size2)
    this.size3.next(size3)
    this.size4.next(size4)
  }
}

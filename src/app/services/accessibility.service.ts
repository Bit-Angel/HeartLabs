import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  secondSize = 50;
  firstSize=20
  thirdSize=23
  fourthSize=16
  fifthSize=30
  sixthSize=16.5

  private size:BehaviorSubject<number> = new BehaviorSubject<number>(50)
  private size2:BehaviorSubject<number> = new BehaviorSubject<number>(20)
  private size3:BehaviorSubject<number> = new BehaviorSubject<number>(23)
  private size4:BehaviorSubject<number> = new BehaviorSubject<number>(16)
  private size5:BehaviorSubject<number> = new BehaviorSubject<number>(30)
  private size6:BehaviorSubject<number> = new BehaviorSubject<number>(16.5)

  _size:Observable<number> = this.size.asObservable(); 
  _size2:Observable<number> = this.size2.asObservable();
  _size3:Observable<number> = this.size3.asObservable();
  _size4:Observable<number> = this.size4.asObservable();
  _size5:Observable<number> = this.size5.asObservable();
  _size6:Observable<number> = this.size6.asObservable();

  constructor() { }

  resetValues(){
    this.secondSize = 50;
    this.firstSize=20
    this.thirdSize=23
    this.fourthSize=16
    this.fifthSize=30
    this.sixthSize=16.5
    this.updateSize(this.secondSize,this.firstSize,this.thirdSize,this.fourthSize,this.fifthSize,this.sixthSize)
  }

  updateSize(size,size2,size3,size4,size5,size6){
    this.size.next(size);
    this.size2.next(size2)
    this.size3.next(size3)
    this.size4.next(size4)
    this.size5.next(size5)
    this.size6.next(size6)
  }
}

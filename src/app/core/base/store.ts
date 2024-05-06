import { Observable, BehaviorSubject, map, distinctUntilChanged } from 'rxjs';

export class Store<T> {
  private _state$: BehaviorSubject<T>;
  public readonly state$: Observable<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get currentStateValue(): T {
    return this._state$.getValue();
  }

  setState(nexState: T): void {
    this._state$.next(nexState);
  }

  subscribeOnly(key: keyof T) {
    return this.state$.pipe(
      map((state: T) => state[key]),
      distinctUntilChanged()
    );
  }
}

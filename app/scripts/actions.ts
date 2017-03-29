import * as redux from 'redux';

export interface Action<T> extends redux.Action {
  payload?: T;
  error?: Error
}

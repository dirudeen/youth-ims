export type ActionResult<T = void, E = string> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: E;
    };

export function ok<T>(data: T): ActionResult<T> {
  return {
    success: true,
    data,
    error: null,
  };
}

export function fail<E = string>(error: E): ActionResult<never, E> {
  return {
    success: false,
    data: null,
    error,
  };
}

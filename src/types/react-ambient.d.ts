declare module "react" {
  export type ChangeEvent<T = any> = {
    target: T;
    currentTarget: T;
  };

  export type FormEvent<T = any> = {
    preventDefault(): void;
    target: T;
    currentTarget: T;
  };

  export function useState<S>(
    initialState: S | (() => S),
  ): [S, (value: S | ((currentState: S) => S)) => void];

  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps?: readonly unknown[]): T;
  export function useRef<T>(initialValue: T): { current: T };
}

import { fromPairs, toPairs } from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ActionArgs<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => void ? A : never;
};

type StoreConfig<T, A> = {
  name: string;
  initialState: T;
  actions: {
    [K in keyof A]: (state: T, ...args: ActionArgs<A>[K]) => void | T;
  };
};

export const createStoreWithMiddlewares = <T, A>({ name, initialState, actions }: StoreConfig<T, A>) => {
  return create<T & A>()(
    devtools(
      persist(
        immer(set => {
          const wrappedActions = fromPairs(
            toPairs(actions).map(([actionName, actionFn]) => [
              actionName,
              (...args: unknown[]) => {
                set(state => (actionFn as (...args) => void)(state, ...args) as unknown, undefined, actionName);
              },
            ]),
          );

          return {
            ...initialState,
            ...(wrappedActions as A),
          };
        }),
        { name },
      ),
      { name, store: name },
    ),
  );
};

import { fromPairs, toPairs } from 'lodash';
import { create } from 'zustand';
import { devtools, persist, PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ActionArgs<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => void ? A : never;
};

type StoreConfig<S, A> = {
  name: string;
  initialState: S;
  actions: {
    [K in keyof A]: (state: S, ...args: ActionArgs<A>[K]) => void | S;
  };
  persistOptions?: Partial<PersistOptions<S & A, Partial<S & A>>>;
};

export const createStoreWithMiddlewares = <S, A>({
  name,
  initialState,
  actions,
  persistOptions,
}: StoreConfig<S, A>) => {
  return create<S & A>()(
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
        { ...persistOptions, name },
      ),
      { name, store: name },
    ),
  );
};

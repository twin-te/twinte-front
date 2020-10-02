export type UseCase<I, O, E = never> = (i: I) => O | E
export type LazyUseCase<I, O, E = never> = (i: I) => Promise<O | E>

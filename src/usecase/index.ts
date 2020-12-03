import { Ports } from '../adapter'

export interface UseCase<R extends Partial<Ports>, A> {
  run(ports: R): Promise<A>
}

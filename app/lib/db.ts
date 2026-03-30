import Dexie from 'dexie'

export class POSDB extends Dexie {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any
  constructor() {
    super('AgaveMariaPOS')
    this.version(1).stores({
      orders: 'id, createdAt'
    })
  }
}

export const db = new POSDB()
export const FALSE = Buffer.alloc(1, 0, 'hex')
export const TRUE = Buffer.alloc(1, 1, 'hex')
export const BITS = 8
export const CARDS = 208
export const STALLS = 208
export const EB = 48
export const AB = 30
export const MB = 16
export const DEVICES = 4
export const MEASURES = 16
export const OPERATIONS = 16
export const QUEUE = 5

export const StallStatus = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}

export const CARD_LEN = 10
export const CARD_INDEX_INIT = 410
export const CARD_VALUE_INIT = 412

export const STALL_LEN = 10
export const MAP_INDEX_INIT = 406
export const MAP_VALUE_INIT = 408

export const DB_CARDS = 441
export const DB_CARDS_INIT = 0
export const DB_CARDS_LEN = CARDS * CARD_LEN

export const DB_MAP = 440
export const DB_MAP_INIT = 0
export const DB_MAP_LEN = STALLS * STALL_LEN

export const DB_DATA = 450
export const DB_DATA_INIT = 0
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 96
export const DB_DATA_INIT_MOT = 266
export const DB_DATA_INIT_QUEUE = 160
export const DB_DATA_INIT_AB = 236
export const DB_DATA_INIT_EB = 188
export const DB_DATA_INIT_MB = 180
export const DB_DATA_LEN = 398
// export const DB_QUEUE = 40

export const REQ_ENTRY_1 = 414
export const REQ_ENTRY_2 = 416
export const REQ_EXIT = 418

export const ALARM_LEN = 8
export const DB_ALARM_1 = 431
export const DB_ALARM_2 = 432
export const DB_ALARM_3 = 433
export const DB_ALARM_4 = 434
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 16 * ALARM_LEN * 4

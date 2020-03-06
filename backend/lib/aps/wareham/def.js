export const PLC = {
  ip: '192.168.59.2',
  rack: 0,
  slot: 1,
  polling_time: 300
}
export const FALSE = Buffer.alloc(1, 0, 'hex')
export const TRUE = Buffer.alloc(1, 1, 'hex')
export const BITS = 8
export const CARDS = 69
export const STALLS = 71
export const AB = 19
export const EB = 31
export const MB = 8
export const DEVICES = 4
export const MEASURES = 8
export const OPERATIONS = 16
export const QUEUE = 5

export const StallStatus = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}

export const CARD_LEN = 10
export const CARD_INDEX_INIT = 242
export const CARD_VALUE_INIT = 244

export const STALL_LEN = 10
export const MAP_INDEX_INIT = 238
export const MAP_VALUE_INIT = 240

export const DB_CARDS = 511
export const DB_CARDS_INIT = 0
export const DB_CARDS_LEN = CARDS * CARD_LEN

export const DB_MAP = 510
export const DB_MAP_INIT = 0
export const DB_MAP_LEN = STALLS * STALL_LEN

export const DB_DATA = 505
export const DB_DATA_INIT = 0
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 96
export const DB_DATA_INIT_QUEUE = 128
export const DB_DATA_INIT_AB = 168
export const DB_DATA_INIT_EB = 188
export const DB_DATA_INIT_MB = 220
export const DB_DATA_LEN = 230

export const REQ_EXIT = 246
export const REQ_ENTRY_1 = 248
export const REQ_ENTRY_2 = 250

export const ALARM_LEN = 8
export const DB_ALARM_1 = 531
export const DB_ALARM_2 = 532
export const DB_ALARM_3 = 533
export const DB_ALARM_4 = 534
export const DB_ALARM_INIT = 6 // 12
export const DB_ALARM_LEN = 16 * ALARM_LEN * 4
export const DBS_ALARM = [
  DB_ALARM_1,
  DB_ALARM_2,
  DB_ALARM_3,
  DB_ALARM_4
]

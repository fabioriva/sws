export const FALSE = Buffer.alloc(1, 0, 'hex')
export const TRUE = Buffer.alloc(1, 1, 'hex')
export const BITS = 8
export const CARDS = 149
export const STALLS = 149
export const AB = 19
export const EB = 26
export const MB = 8
export const DEVICES = 3
export const MEASURES = 4
export const OPERATIONS = 16
export const QUEUE = 5

export const StallStatus = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 999 // 65535
}

export const CARD_LEN = 10
export const CARD_INDEX_INIT = 180
export const CARD_VALUE_INIT = 182

export const STALL_LEN = 10
export const MAP_INDEX_INIT = 176
export const MAP_VALUE_INIT = 178

export const DB_CARDS = 511
export const DB_CARDS_INIT = 0
export const DB_CARDS_LEN = CARDS * CARD_LEN

export const DB_MAP = 510
export const DB_MAP_INIT = 0
export const DB_MAP_LEN = STALLS * STALL_LEN

export const DB_DATA = 505
export const DB_DATA_INIT = 0
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 80
export const DB_DATA_INIT_QUEUE = 96
export const DB_DATA_INIT_AB = 116
export const DB_DATA_INIT_EB = 136
export const DB_DATA_INIT_MB = 162
export const DB_DATA_LEN = 170

export const REQ_EXIT = 184
export const REQ_ENTRY_1 = 186
export const REQ_ENTRY_2 = 188

export const ALARM_LEN = 8
export const DB_ALARM_1 = 531
export const DB_ALARM_2 = 532
export const DB_ALARM_3 = 533
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 16 * ALARM_LEN * 4

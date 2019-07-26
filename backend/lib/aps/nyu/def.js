// export const APS = 'nyu'
// export const HTTP_PORT = 8083
export const PLC = {
  ip: '192.168.55.2',
  rack: 0,
  slot: 1,
  polling_time: 300
}
export const FALSE = Buffer.alloc(1, 0, 'hex')
export const TRUE = Buffer.alloc(1, 1, 'hex')
export const BITS = 8
export const CARDS = 119
export const STALLS = 121
export const AB = 22
export const EB = 34
export const MB = 8
export const DEVICES = 2
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
export const CARD_INDEX_INIT = 184
export const CARD_VALUE_INIT = 186

export const STALL_LEN = 10
export const MAP_INDEX_INIT = 180
export const MAP_VALUE_INIT = 182

export const DB_CARDS = 511
export const DB_CARDS_INIT = 0
export const DB_CARDS_LEN = CARDS * CARD_LEN

export const DB_MAP = 510
export const DB_MAP_INIT = 0
export const DB_MAP_LEN = STALLS * STALL_LEN

export const DB_DATA = 505
export const DB_DATA_INIT = 0
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 64
export const DB_DATA_INIT_QUEUE = 96
export const DB_DATA_INIT_AB = 116
export const DB_DATA_INIT_EB = 136
export const DB_DATA_INIT_MB = 166
export const DB_DATA_LEN = 176

export const REQ_EXIT = 188
export const REQ_ENTRY_1 = 190
export const REQ_ENTRY_2 = 192

export const ALARM_LEN = 8
export const DB_ALARM_1 = 431
export const DB_ALARM_2 = 432
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 16 * ALARM_LEN * 4
export const DBS_ALARM = [DB_ALARM_1, DB_ALARM_2]

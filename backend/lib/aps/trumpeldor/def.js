// export const HTTP_PORT = 8084
export const PLC = {
  ip: '192.168.20.55', // '140.80.48.12'
  rack: 0,
  slot: 1,
  polling_time: 500
}

export const FALSE = Buffer.alloc(1, 0, 'hex')
export const TRUE = Buffer.alloc(1, 1, 'hex')
export const BITS = 8
export const CARDS = 39
export const STALLS = 40
export const AB = 8
export const EB = 14
export const MB = 8
export const DEVICES = 1
export const MEASURES = 4
export const OPERATIONS = 16
export const QUEUE = 5

export const StallStatus = {
  FREE: 0,
  PAPA: 997, // 65533
  RSVD: 998, // 65534
  LOCK: 100 // 65535
}

export const CARD_LEN = 10
export const CARD_INDEX_INIT = 120
export const CARD_VALUE_INIT = 122

export const STALL_LEN = 10
export const MAP_INDEX_INIT = 116
export const MAP_VALUE_INIT = 118

export const DB_CARDS = 411
export const DB_CARDS_INIT = 0
export const DB_CARDS_LEN = CARDS * CARD_LEN

export const DB_MAP = 510
export const DB_MAP_INIT = 0
export const DB_MAP_LEN = STALLS * STALL_LEN

export const DB_DATA = 505
export const DB_DATA_INIT = 0
export const DB_DATA_INIT_DEVICE = 32
export const DB_DATA_INIT_POS = 48
export const DB_DATA_INIT_QUEUE = 64
export const DB_DATA_INIT_AB = 84
export const DB_DATA_INIT_EB = 92
export const DB_DATA_INIT_MB = 106
export const DB_DATA_LEN = 114

export const REQ_EXIT = 124
export const REQ_ENTRY_1 = 126
export const REQ_ENTRY_2 = 128

export const ALARM_LEN = 8
export const DB_ALARM = 531
export const DB_ALARM_INIT = 12
export const DB_ALARM_LEN = 16 * ALARM_LEN * 4
export const DBS_ALARM = [DB_ALARM]

export const DB_EXIT_QUEUE = 40

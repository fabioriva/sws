import * as s7def from './def'
import * as strings from './strings'
import {
  Input,
  Output,
  Merker,
  Alarm,
  Button,
  Card,
  Device,
  Measure,
  Operation,
  Queue,
  Stall
} from '../models'

/*
 * Alarms.
 */

var alarms1 = []
for (let a = 0; a < 64; a++) {
  alarms1.push(new Alarm(a + 1, 1, 0))
}
alarms1.forEach((a, i) => {
  a.label = strings.alarms1[i].label
  a._info = strings.alarms1[i].info
})

export var alarms = [
  alarms1
]

export var diag = {
  count: 0,
  groups: [
    {
      count: 0,
      active: []
    }
  ],
  isActive: false
}

/*
 * Digital I / O.
 */

function generateBits (type, min, max) {
  let B = []
  for (let e = min; e <= max; e++) {
    for (let b = 0; b < s7def.BITS; b++) {
      if (type === 'E') B.push(new Input(e, b, 0))
      if (type === 'A') B.push(new Output(e, b, 0))
      if (type === 'M') B.push(new Merker(e, b, 0))
    }
  }
  return B
}

function generateByte (bits) {
  let bytes = []
  let byte = []
  bits.forEach((bit, i) => {
    if (i !== 0 && i % s7def.BITS === 0) {
      bytes.push(byte)
      byte = []
    }
    byte.push(bit)
  })
  bytes.push(byte)
  return bytes
}

var inputs1 = generateBits('E', 4, 13)
inputs1.forEach((b, i) => {
  b.label = strings.inputs1[i].label
  b._info = strings.inputs1[i].info
})
var inputs2 = generateBits('E', 14, 17)
inputs2.forEach((b, i) => {
  b.label = strings.inputs2[i].label
  b._info = strings.inputs2[i].info
})

export var inputs = generateByte(inputs1.concat(inputs2))

var outputs1 = generateBits('A', 4, 9)
outputs1.forEach((b, i) => {
  b.label = strings.outputs1[i].label
  b._info = strings.outputs1[i].info
})
var outputs2 = generateBits('A', 14, 15)
outputs2.forEach((b, i) => {
  b.label = strings.outputs2[i].label
  b._info = strings.outputs2[i].info
})

export var outputs = generateByte(outputs1.concat(outputs2))

var merkers1 = generateBits('M', 0, 7)
merkers1.forEach((b, i) => {
  b.label = strings.merkers1[i].label
  b._info = strings.merkers1[i].info
})

export var merkers = generateByte(merkers1)

/*
 * Cards
 */

export var cards = []
for (let c = 0; c < s7def.CARDS; c++) {
  cards.push(new Card(c + 1))
}

/*
 * Overview
 */

export var devices = []
for (let d = 0; d < s7def.DEVICES; d++) {
  devices.push(new Device(d + 1, strings.devices[d], strings.modes))
}

export var measures = []
for (let d = 0; d < s7def.MEASURES; d++) {
  measures.push(new Measure(strings.measures[d]))
}

export var operations = []
for (let o = 0; o < s7def.OPERATIONS; o++) {
  operations.push(new Operation(o, strings.operations[o]))
}

export var exitQueue = []
for (let q = 0; q < s7def.QUEUE; q++) {
  exitQueue.push(new Queue(q))
}

var B00 = new Button(merkers1.find(b => b.addr === 'M3.5'), 'logout', 'Uscita')
var B1A = new Button(merkers1.find(b => b.addr === 'M3.0'), 'login', 'Entrata')
var B2A = new Button(merkers1.find(b => b.addr === 'M4.0'), 'rollback', 'Rollback')
// var B1B = new Button(merkers1.find(b => b.addr === 'M3.1'), 'login', 'Entrata')
// var B2B = new Button(merkers1.find(b => b.addr === 'M4.1'), 'rollback', 'Rollback')

var EL = {
  a: devices[0],
  b: measures.slice(0, 4),
  c: [
    inputs1.find(b => b.addr === 'E7.3'),
    outputs1.find(b => b.addr === 'A4.7'),
    outputs1.find(b => b.addr === 'A4.6')
  ],
  d: [
    B1A,
    B2A
  ]
}

export var overview = {
  devices: [
    EL
  ],
  exitQueue: {
    queueList: exitQueue,
    exitButton: B00
  }
}

/*
 * Map
 */

export var stalls = []
for (let s = 0; s < s7def.STALLS; s++) {
  stalls.push(new Stall(s + 1, 0))
}

var TYPE_0 = [
  {
    name: 'Free',
    value: 100
  },
  {
    name: 'Busy',
    value: 0
  },
  {
    name: 'Lock',
    value: 0
  }
]

var TYPE_1 = [
  {
    name: 'Free',
    value: 100
  },
  {
    name: 'Busy',
    value: 0
  },
  {
    name: 'Lock',
    value: 0
  }
]

var TYPE_2 = [
  {
    name: 'Free',
    value: 100
  },
  {
    name: 'Busy',
    value: 0
  },
  {
    name: 'Lock',
    value: 0
  }
]

var TYPE_3 = [
  {
    name: 'Free',
    value: 100
  },
  {
    name: 'Busy',
    value: 0
  },
  {
    name: 'Lock',
    value: 0
  }
]

export var map = {
  limits: {
    minCard: 1,
    maxCard: s7def.CARDS,
    minStall: 1,
    maxStall: s7def.STALLS
  },
  statistics: [
    TYPE_0,
    TYPE_1,
    TYPE_2,
    TYPE_3
  ],
  levels: [
    {
      nr: 1,
      label: 'Level 1',
      min: 1,
      max: 31,
      stalls: stalls.slice(0, 13),
      elevators: [
        { id: 'el-1', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: 'Level 2',
      min: 32,
      max: 62,
      stalls: stalls.slice(13, 26),
      elevators: [
        { id: 'el-2', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 63,
      max: 93,
      stalls: stalls.slice(26, 40),
      elevators: [
        { id: 'el-3', label: 'EL' }
      ]
    }
  ]
}

/*
 * PLC Racks
 */

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'Main',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB4',
          bits: inputs[0]
        },
        {
          label: 'EB5',
          bits: inputs[1]
        },
        {
          label: 'EB6',
          bits: inputs[2]
        },
        {
          label: 'EB7',
          bits: inputs[3]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB8',
          bits: inputs[4]
        },
        {
          label: 'EB9',
          bits: inputs[5]
        },
        {
          label: 'EB10',
          bits: inputs[6]
        },
        {
          label: 'EB11',
          bits: inputs[7]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB4',
          bits: outputs[0]
        },
        {
          label: 'AB5',
          bits: outputs[1]
        },
        {
          label: 'AB6',
          bits: outputs[2]
        },
        {
          label: 'AB7',
          bits: outputs[3]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB8',
          bits: outputs[4]
        },
        {
          label: 'AB9',
          bits: outputs[5]
        }
      ]
    },
    {
      nr: '5',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB12',
          bits: inputs[8]
        },
        {
          label: 'EB13',
          bits: inputs[9]
        }
      ]
    }
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'KKP',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB14',
          bits: inputs[10]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB15',
          bits: inputs[11]
        }
      ]
    },
    {
      nr: '3',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB16',
          bits: inputs[12]
        }
      ]
    },
    {
      nr: '4',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB17',
          bits: inputs[13]
        }
      ]
    },
    {
      nr: '5',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB14',
          bits: outputs[6]
        }
      ]
    },
    {
      nr: '6',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB15',
          bits: outputs[7]
        }
      ]
    }
  ]
}

export const racks = [
  rack1,
  rack2
]

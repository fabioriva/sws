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

var alarms2 = []
for (let a = 0; a < 64; a++) {
  alarms2.push(new Alarm(a + 1, 2, 0))
}
alarms2.forEach((a, i) => {
  a.label = strings.alarms2[i].label
  a._info = strings.alarms2[i].info
})

var alarms3 = []
for (let a = 0; a < 64; a++) {
  alarms3.push(new Alarm(a + 1, 3, 0))
}
alarms3.forEach((a, i) => {
  a.label = strings.alarms3[i].label
  a._info = strings.alarms3[i].info
})

export var alarms = [
  alarms1,
  alarms2,
  alarms3
]

export var diag = {
  count: 0,
  groups: [
    {
      count: 0,
      active: []
    },
    {
      count: 0,
      active: []
    },
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

var inputs1 = generateBits('E', 0, 3)
inputs1.forEach((b, i) => {
  b.label = strings.inputs1[i].label
  b._info = strings.inputs1[i].info
})
var inputs2 = generateBits('E', 10, 17)
inputs2.forEach((b, i) => {
  b.label = strings.inputs2[i].label
  b._info = strings.inputs2[i].info
})
var inputs3 = generateBits('E', 20, 27)
inputs3.forEach((b, i) => {
  b.label = strings.inputs3[i].label
  b._info = strings.inputs3[i].info
})
var inputs4 = generateBits('E', 30, 31)
inputs4.forEach((b, i) => {
  b.label = strings.inputs4[i].label
  b._info = strings.inputs4[i].info
})
var inputs5 = generateBits('E', 40, 43)
inputs5.forEach((b, i) => {
  b.label = strings.inputs5[i].label
  b._info = strings.inputs5[i].info
})

export var inputs = generateByte(inputs1.concat(inputs2, inputs3, inputs4, inputs5))

var outputs1 = generateBits('A', 0, 1)
outputs1.forEach((b, i) => {
  b.label = strings.outputs1[i].label
  b._info = strings.outputs1[i].info
})
var outputs2 = generateBits('A', 10, 15)
outputs2.forEach((b, i) => {
  b.label = strings.outputs2[i].label
  b._info = strings.outputs2[i].info
})
var outputs3 = generateBits('A', 20, 25)
outputs3.forEach((b, i) => {
  b.label = strings.outputs3[i].label
  b._info = strings.outputs3[i].info
})
var outputs4 = generateBits('A', 30, 31)
outputs4.forEach((b, i) => {
  b.label = strings.outputs4[i].label
  b._info = strings.outputs4[i].info
})
var outputs5 = generateBits('A', 40, 42)
outputs5.forEach((b, i) => {
  b.label = strings.outputs5[i].label
  b._info = strings.outputs5[i].info
})

export var outputs = generateByte(outputs1.concat(outputs2, outputs3, outputs4, outputs5))

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
var B1B = new Button(merkers1.find(b => b.addr === 'M3.1'), 'login', 'Entrata')
var B2B = new Button(merkers1.find(b => b.addr === 'M4.1'), 'rollback', 'Rollback')

var ELA = {
  a: devices[0],
  b: [],
  c: [
    inputs1.find(b => b.addr === 'E2.3'),
    outputs2.find(b => b.addr === 'A12.7'),
    outputs2.find(b => b.addr === 'A12.6')
  ],
  d: [
    B1A,
    B2A
  ]
}

var ELB = {
  a: devices[1],
  b: [],
  c: [
    inputs1.find(b => b.addr === 'E2.3'),
    outputs3.find(b => b.addr === 'A22.7'),
    outputs3.find(b => b.addr === 'A22.6')
  ],
  d: [
    B1B,
    B2B
  ]
}

var T = {
  a: devices[2],
  b: measures.slice(0, 4),
  c: [
    inputs4.find(b => b.addr === 'E31.3'),
    outputs5.find(b => b.addr === 'A42.7'),
    outputs5.find(b => b.addr === 'A42.6')
  ],
  d: []
}

export var overview = {
  devices: [
    ELA,
    ELB,
    T
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
      label: 'Piano 1',
      min: 1,
      max: 31,
      stalls: stalls.slice(0, 31)
    },
    {
      nr: 2,
      label: 'Piano 2',
      min: 32,
      max: 62,
      stalls: stalls.slice(31, 62)
    },
    {
      nr: 3,
      label: 'Piano 3',
      min: 63,
      max: 93,
      stalls: stalls.slice(62, 93)
    },
    {
      nr: 4,
      label: 'Piano 4',
      min: 95,
      max: 124,
      stalls: stalls.slice(93, 124)
    },
    {
      nr: 5,
      label: 'Piano 5',
      min: 125,
      max: 149,
      stalls: stalls.slice(124, 149),
      elevators: [
        { id: 'el-a', label: 'A' },
        { id: 'el-b', label: 'B' }
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
  title: 'Elevatore A',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB0',
          bits: inputs[0]
        },
        {
          label: 'EB1',
          bits: inputs[1]
        },
        {
          label: 'EB2',
          bits: inputs[2]
        },
        {
          label: 'EB3',
          bits: inputs[3]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB0',
          bits: outputs[0]
        },
        {
          label: 'AB1',
          bits: outputs[1]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB10',
          bits: inputs[4]
        },
        {
          label: 'EB11',
          bits: inputs[5]
        },
        {
          label: 'EB12',
          bits: inputs[6]
        },
        {
          label: 'EB13',
          bits: inputs[7]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB14',
          bits: inputs[8]
        },
        {
          label: 'EB15',
          bits: inputs[9]
        },
        {
          label: 'EB16',
          bits: inputs[10]
        },
        {
          label: 'EB17',
          bits: inputs[11]
        }
      ]
    },
    {
      nr: '5',
      type: '6ES7 522-1BL01-0AB0',
      bytes: [
        {
          label: 'AB10',
          bits: outputs[2]
        },
        {
          label: 'AB11',
          bits: outputs[3]
        },
        {
          label: 'AB12',
          bits: outputs[4]
        },
        {
          label: 'AB13',
          bits: outputs[5]
        }
      ]
    },
    {
      nr: '6',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB14',
          bits: outputs[6]
        },
        {
          label: 'AB15',
          bits: outputs[7]
        }
      ]
    }
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'Elevatore B',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB20',
          bits: inputs[12]
        },
        {
          label: 'EB21',
          bits: inputs[13]
        },
        {
          label: 'EB22',
          bits: inputs[14]
        },
        {
          label: 'EB23',
          bits: inputs[15]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1Bl00-0AB0',
      bytes: [
        {
          label: 'EB24',
          bits: inputs[16]
        },
        {
          label: 'EB25',
          bits: inputs[17]
        },
        {
          label: 'EB26',
          bits: inputs[18]
        },
        {
          label: 'EB27',
          bits: inputs[19]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL01-0AB0',
      bytes: [
        {
          label: 'AB20',
          bits: outputs[8]
        },
        {
          label: 'AB21',
          bits: outputs[9]
        },
        {
          label: 'AB22',
          bits: outputs[10]
        },
        {
          label: 'AB23',
          bits: outputs[11]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB24',
          bits: outputs[12]
        },
        {
          label: 'AB25',
          bits: outputs[13]
        }
      ]
    }
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'Torre',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB30',
          bits: inputs[20]
        },
        {
          label: 'EB31',
          bits: inputs[21]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB30',
          bits: outputs[14]
        },
        {
          label: 'AB31',
          bits: outputs[15]
        }
      ]
    }
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200s',
  title: 'Torre (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB40',
          bits: inputs[22]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB41',
          bits: inputs[23]
        }
      ]
    },
    {
      nr: '3',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB42',
          bits: inputs[24]
        }
      ]
    },
    {
      nr: '4',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB43',
          bits: inputs[25]
        }
      ]
    },
    {
      nr: '5',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB40',
          bits: outputs[16]
        }
      ]
    },
    {
      nr: '6',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB41',
          bits: outputs[17]
        }
      ]
    },
    {
      nr: '7',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB42',
          bits: outputs[18]
        }
      ]
    }
  ]
}

export const racks = [
  rack1,
  rack2,
  rack3,
  rack4
]

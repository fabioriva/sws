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

export var alarms = [
  alarms1,
  alarms2
]

export var diag = {
  count: 0,
  groups: [
    {
      title: 'System 1',
      count: 0,
      active: []
    },
    {
      title: 'System 2',
      count: 0,
      active: []
    }
  ]
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
var inputs2 = generateBits('E', 100, 107)
inputs2.forEach((b, i) => {
  b.label = strings.inputs2[i].label
  b._info = strings.inputs2[i].info
})
var inputs3 = generateBits('E', 110, 114)
inputs3.forEach((b, i) => {
  b.label = strings.inputs3[i].label
  b._info = strings.inputs3[i].info
})
var inputs4 = generateBits('E', 200, 207)
inputs4.forEach((b, i) => {
  b.label = strings.inputs4[i].label
  b._info = strings.inputs4[i].info
})
var inputs5 = generateBits('E', 210, 214)
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
var outputs2 = generateBits('A', 100, 105)
outputs2.forEach((b, i) => {
  b.label = strings.outputs2[i].label
  b._info = strings.outputs2[i].info
})
var outputs3 = generateBits('A', 110, 112)
outputs3.forEach((b, i) => {
  b.label = strings.outputs3[i].label
  b._info = strings.outputs3[i].info
})
var outputs4 = generateBits('A', 200, 205)
outputs4.forEach((b, i) => {
  b.label = strings.outputs4[i].label
  b._info = strings.outputs4[i].info
})
var outputs5 = generateBits('A', 210, 212)
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

var B00 = new Button(merkers1.find(b => b.addr === 'M3.5'), 'logout', 'Exit')
var B1A = new Button(merkers1.find(b => b.addr === 'M3.0'), 'login', 'Entry')
var B2A = new Button(merkers1.find(b => b.addr === 'M4.0'), 'rollback', 'Rollback')
var B1B = new Button(merkers1.find(b => b.addr === 'M3.1'), 'login', 'Entry')
var B2B = new Button(merkers1.find(b => b.addr === 'M4.1'), 'rollback', 'Rollback')

const SILOMAT_A = [
  inputs3.find(b => b.addr === 'E110.0'),
  inputs3.find(b => b.addr === 'E110.1'),
  inputs3.find(b => b.addr === 'E110.2'),
  inputs3.find(b => b.addr === 'E110.3'),
  inputs3.find(b => b.addr === 'E110.4'),
  inputs3.find(b => b.addr === 'E110.5'),
  inputs3.find(b => b.addr === 'E110.6'),
  inputs3.find(b => b.addr === 'E110.7'),
  outputs3.find(b => b.addr === 'A112.1'),
  outputs3.find(b => b.addr === 'A112.2'),
  outputs3.find(b => b.addr === 'A112.3'),
  outputs3.find(b => b.addr === 'A111.2'),
  outputs3.find(b => b.addr === 'A111.3'),
  outputs3.find(b => b.addr === 'A111.4')
]

var ELA = {
  a: devices[0],
  b: measures.slice(0, 4),
  c: [
    inputs2.find(b => b.addr === 'E103.3'),
    outputs2.find(b => b.addr === 'A100.7'),
    outputs2.find(b => b.addr === 'A100.6')
  ],
  d: [
    B1A,
    B2A
  ],
  e: SILOMAT_A
}

const SILOMAT_B = [
  inputs5.find(b => b.addr === 'E210.0'),
  inputs5.find(b => b.addr === 'E210.1'),
  inputs5.find(b => b.addr === 'E210.2'),
  inputs5.find(b => b.addr === 'E210.3'),
  inputs5.find(b => b.addr === 'E210.4'),
  inputs5.find(b => b.addr === 'E210.5'),
  inputs5.find(b => b.addr === 'E210.6'),
  inputs5.find(b => b.addr === 'E210.7'),
  outputs5.find(b => b.addr === 'A212.1'),
  outputs5.find(b => b.addr === 'A212.2'),
  outputs5.find(b => b.addr === 'A212.3'),
  outputs5.find(b => b.addr === 'A211.2'),
  outputs5.find(b => b.addr === 'A211.3'),
  outputs5.find(b => b.addr === 'A211.4')
]

var ELB = {
  a: devices[1],
  b: measures.slice(4, 8),
  c: [
    inputs4.find(b => b.addr === 'E203.3'),
    outputs4.find(b => b.addr === 'A200.7'),
    outputs4.find(b => b.addr === 'A200.6')
  ],
  d: [
    B1B,
    B2B
  ],
  e: SILOMAT_B
}

export var overview = {
  devices: [
    ELA,
    ELB
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
      label: 'Level +1',
      min: 1,
      max: 18,
      stalls: stalls.slice(0, 18),
      elevators: [
        { id: 'el-a1', label: 'A1' },
        { id: 'el-b1', label: 'B2' }
      ]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 19,
      max: 45,
      stalls: stalls.slice(18, 45),
      elevators: [
        { id: 'el-a2', label: 'A1' },
        { id: 'el-b2', label: 'B2' }
      ]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 46,
      max: 83,
      stalls: stalls.slice(45, 83),
      elevators: [
        { id: 'el-a3', label: 'A1' },
        { id: 'el-b3', label: 'B2' }
      ]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 84,
      max: 121,
      stalls: stalls.slice(83, 121),
      elevators: [
        { id: 'el-a4', label: 'A1' },
        { id: 'el-b4', label: 'B2' }
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
    }
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'System 1',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB100',
          bits: inputs[4]
        },
        {
          label: 'EB101',
          bits: inputs[5]
        },
        {
          label: 'EB102',
          bits: inputs[6]
        },
        {
          label: 'EB103',
          bits: inputs[7]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1Bl00-0AB0',
      bytes: [
        {
          label: 'EB104',
          bits: inputs[8]
        },
        {
          label: 'EB105',
          bits: inputs[9]
        },
        {
          label: 'EB106',
          bits: inputs[10]
        },
        {
          label: 'EB107',
          bits: inputs[11]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL01-0AB0',
      bytes: [
        {
          label: 'AB100',
          bits: outputs[2]
        },
        {
          label: 'AB101',
          bits: outputs[3]
        },
        {
          label: 'AB102',
          bits: outputs[4]
        },
        {
          label: 'AB103',
          bits: outputs[5]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB104',
          bits: outputs[6]
        },
        {
          label: 'AB105',
          bits: outputs[7]
        }
      ]
    }
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'System 1 (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB110',
          bits: inputs[12]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB111',
          bits: inputs[13]
        }
      ]
    },
    {
      nr: '3',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB112',
          bits: inputs[14]
        }
      ]
    },
    {
      nr: '4',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB113',
          bits: inputs[15]
        }
      ]
    },
    {
      nr: '5',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB114',
          bits: inputs[16]
        }
      ]
    },
    {
      nr: '6',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB110',
          bits: outputs[8]
        }
      ]
    },
    {
      nr: '7',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB111',
          bits: outputs[9]
        }
      ]
    },
    {
      nr: '8',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB112',
          bits: outputs[10]
        }
      ]
    }
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'System 2',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB200',
          bits: inputs[17]
        },
        {
          label: 'EB201',
          bits: inputs[18]
        },
        {
          label: 'EB202',
          bits: inputs[19]
        },
        {
          label: 'EB203',
          bits: inputs[20]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1Bl00-0AB0',
      bytes: [
        {
          label: 'EB204',
          bits: inputs[21]
        },
        {
          label: 'EB205',
          bits: inputs[22]
        },
        {
          label: 'EB206',
          bits: inputs[23]
        },
        {
          label: 'EB207',
          bits: inputs[24]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL01-0AB0',
      bytes: [
        {
          label: 'AB200',
          bits: outputs[11]
        },
        {
          label: 'AB201',
          bits: outputs[12]
        },
        {
          label: 'AB202',
          bits: outputs[13]
        },
        {
          label: 'AB203',
          bits: outputs[14]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB204',
          bits: outputs[15]
        },
        {
          label: 'AB205',
          bits: outputs[16]
        }
      ]
    }
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'System 2 (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB210',
          bits: inputs[25]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB211',
          bits: inputs[26]
        }
      ]
    },
    {
      nr: '3',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB212',
          bits: inputs[27]
        }
      ]
    },
    {
      nr: '4',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB213',
          bits: inputs[28]
        }
      ]
    },
    {
      nr: '5',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB214',
          bits: inputs[29]
        }
      ]
    },
    {
      nr: '6',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB210',
          bits: outputs[17]
        }
      ]
    },
    {
      nr: '7',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB211',
          bits: outputs[18]
        }
      ]
    },
    {
      nr: '8',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB212',
          bits: outputs[19]
        }
      ]
    }
  ]
}

export const racks = [
  rack1,
  rack2,
  rack3,
  rack4,
  rack5
]

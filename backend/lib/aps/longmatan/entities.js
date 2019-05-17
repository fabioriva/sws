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
  alarms2.push(new Alarm(a + 1, 1, 0))
}
alarms2.forEach((a, i) => {
  a.label = strings.alarms1[i].label
  a._info = strings.alarms1[i].info
})

var alarms3 = []
for (let a = 0; a < 64; a++) {
  alarms3.push(new Alarm(a + 1, 1, 0))
}
alarms3.forEach((a, i) => {
  a.label = strings.alarms1[i].label
  a._info = strings.alarms1[i].info
})

var alarms4 = []
for (let a = 0; a < 64; a++) {
  alarms4.push(new Alarm(a + 1, 1, 0))
}
alarms4.forEach((a, i) => {
  a.label = strings.alarms1[i].label
  a._info = strings.alarms1[i].info
})

export var alarms = [
  alarms1,
  alarms2,
  alarms3,
  alarms4
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

var inputs0 = generateBits('E', 0, 3)
inputs0.forEach((b, i) => {
  b.label = strings.inputs0[i].label
  b._info = strings.inputs0[i].info
})
var inputs1 = generateBits('E', 100, 109)
inputs1.forEach((b, i) => {
  b.label = strings.inputs1[i].label
  b._info = strings.inputs1[i].info
})
var inputs2 = generateBits('E', 160, 165)
inputs2.forEach((b, i) => {
  b.label = strings.inputs2[i].label
  b._info = strings.inputs2[i].info
})
var inputs3 = generateBits('E', 200, 209)
inputs3.forEach((b, i) => {
  b.label = strings.inputs3[i].label
  b._info = strings.inputs3[i].info
})
var inputs4 = generateBits('E', 260, 265)
inputs4.forEach((b, i) => {
  b.label = strings.inputs4[i].label
  b._info = strings.inputs4[i].info
})
var inputs5 = generateBits('E', 300, 309)
inputs5.forEach((b, i) => {
  b.label = strings.inputs5[i].label
  b._info = strings.inputs5[i].info
})
var inputs6 = generateBits('E', 360, 365)
inputs6.forEach((b, i) => {
  b.label = strings.inputs6[i].label
  b._info = strings.inputs6[i].info
})
var inputs7 = generateBits('E', 400, 409)
inputs7.forEach((b, i) => {
  b.label = strings.inputs7[i].label
  b._info = strings.inputs7[i].info
})
var inputs8 = generateBits('E', 460, 465)
inputs8.forEach((b, i) => {
  b.label = strings.inputs8[i].label
  b._info = strings.inputs8[i].info
})

export var inputs = generateByte(inputs0.concat(inputs1, inputs2, inputs3, inputs4, inputs5, inputs6, inputs7, inputs8))

var outputs0 = generateBits('A', 0, 3)
outputs0.forEach((b, i) => {
  b.label = strings.outputs0[i].label
  b._info = strings.outputs0[i].info
})
var outputs1 = generateBits('A', 100, 107)
outputs1.forEach((b, i) => {
  b.label = strings.outputs1[i].label
  b._info = strings.outputs1[i].info
})
var outputs2 = generateBits('A', 160, 163)
outputs2.forEach((b, i) => {
  b.label = strings.outputs2[i].label
  b._info = strings.outputs2[i].info
})
var outputs3 = generateBits('A', 200, 207)
outputs3.forEach((b, i) => {
  b.label = strings.outputs3[i].label
  b._info = strings.outputs3[i].info
})
var outputs4 = generateBits('A', 260, 263)
outputs4.forEach((b, i) => {
  b.label = strings.outputs4[i].label
  b._info = strings.outputs4[i].info
})
var outputs5 = generateBits('A', 300, 307)
outputs5.forEach((b, i) => {
  b.label = strings.outputs5[i].label
  b._info = strings.outputs5[i].info
})
var outputs6 = generateBits('A', 360, 363)
outputs6.forEach((b, i) => {
  b.label = strings.outputs6[i].label
  b._info = strings.outputs6[i].info
})
var outputs7 = generateBits('A', 400, 407)
outputs7.forEach((b, i) => {
  b.label = strings.outputs7[i].label
  b._info = strings.outputs7[i].info
})
var outputs8 = generateBits('A', 460, 463)
outputs8.forEach((b, i) => {
  b.label = strings.outputs8[i].label
  b._info = strings.outputs8[i].info
})

export var outputs = generateByte(outputs0.concat(outputs1, outputs2, outputs3, outputs4, outputs5, outputs6, outputs7, outputs8))

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
 * Map
 */

var fields = new Array(s7def.STALLS)

fields.fill(1, 0, 11)
fields.fill(2, 11, 20)
fields.fill(1, 20, 29)
fields.fill(2, 29, 38)
fields.fill(1, 38, 47)
fields.fill(2, 47, 56)
fields.fill(1, 56, 65)
fields.fill(2, 65, 74)
fields.fill(1, 74, 83)
fields.fill(2, 83, 92)
fields.fill(1, 92, 101)
fields.fill(2, 101, 110)
fields.fill(1, 110, 119)
fields.fill(2, 119, 128)
fields.fill(1, 128, 137)
fields.fill(2, 137, 146)
fields.fill(1, 146, 155)
fields.fill(2, 155, 164)

fields.fill(4, 164, 176)
fields.fill(3, 176, 185)
fields.fill(4, 185, 194)
fields.fill(3, 194, 203)
fields.fill(4, 203, 212)
fields.fill(3, 212, 221)
fields.fill(4, 221, 230)
fields.fill(3, 230, 239)
fields.fill(4, 239, 248)
fields.fill(3, 248, 257)
fields.fill(4, 257, 266)
fields.fill(3, 266, 275)
fields.fill(4, 275, 284)
fields.fill(3, 284, 293)
fields.fill(4, 293, 302)
fields.fill(3, 302, 311)
fields.fill(4, 311, 320)

export var stalls = []
for (let s = 0; s < s7def.STALLS; s++) {
  stalls.push(new Stall(s + 1, 0, fields[s]))
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

var TYPE_4 = [
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
    TYPE_3,
    TYPE_4
  ],
  levels: [
    {
      nr: 1,
      label: 'Level -1',
      min: 0,
      max: 0,
      stalls: stalls.slice(0, 20).concat(stalls.slice(164, 176)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 2,
      label: 'Level +1',
      min: 0,
      max: 0,
      stalls: stalls.slice(20, 38).concat(stalls.slice(176, 194)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 3,
      label: 'Level +2',
      min: 0,
      max: 0,
      stalls: stalls.slice(38, 56).concat(stalls.slice(194, 212)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 4,
      label: 'Level +3',
      min: 0,
      max: 0,
      stalls: stalls.slice(56, 74).concat(stalls.slice(212, 230)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 5,
      label: 'Level +4',
      min: 0,
      max: 0,
      stalls: stalls.slice(74, 92).concat(stalls.slice(230, 248)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 6,
      label: 'Level +5',
      min: 0,
      max: 0,
      stalls: stalls.slice(92, 110).concat(stalls.slice(248, 266)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 7,
      label: 'Level +6',
      min: 0,
      max: 0,
      stalls: stalls.slice(110, 128).concat(stalls.slice(266, 284)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 8,
      label: 'Level +7',
      min: 0,
      max: 0,
      stalls: stalls.slice(128, 146).concat(stalls.slice(284, 302)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    },
    {
      nr: 9,
      label: 'Level +8',
      min: 0,
      max: 0,
      stalls: stalls.slice(146, 164).concat(stalls.slice(302, 320)),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' },
        { id: 'el-3', label: 'EL3' },
        { id: 'el-4', label: 'EL4' }
      ]
    }
  ]
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
var B1A = new Button(merkers1.find(b => b.addr === 'M3.1'), 'login', 'Entrata')
var B2A = new Button(merkers1.find(b => b.addr === 'M4.1'), 'rollback', 'Rollback')
var B1B = new Button(merkers1.find(b => b.addr === 'M3.2'), 'login', 'Entrata')
var B2B = new Button(merkers1.find(b => b.addr === 'M4.2'), 'rollback', 'Rollback')
var B1C = new Button(merkers1.find(b => b.addr === 'M3.3'), 'login', 'Entrata')
var B2C = new Button(merkers1.find(b => b.addr === 'M4.3'), 'rollback', 'Rollback')
var B1D = new Button(merkers1.find(b => b.addr === 'M3.4'), 'login', 'Entrata')
var B2D = new Button(merkers1.find(b => b.addr === 'M4.4'), 'rollback', 'Rollback')

var EL1 = {
  a: devices[0],
  b: measures.slice(0, 3),
  c: [
    inputs1.find(b => b.addr === 'E103.5'),
    outputs1.find(b => b.addr === 'A102.7'),
    outputs1.find(b => b.addr === 'A102.6')
  ],
  d: [
    B1A,
    B2A
  ]
}

var EL2 = {
  a: devices[1],
  b: measures.slice(3, 6),
  c: [
    inputs3.find(b => b.addr === 'E203.5'),
    outputs3.find(b => b.addr === 'A202.7'),
    outputs3.find(b => b.addr === 'A202.6')
  ],
  d: [
    B1B,
    B2B
  ]
}

var EL3 = {
  a: devices[2],
  b: measures.slice(6, 9),
  c: [
    inputs5.find(b => b.addr === 'E303.5'),
    outputs5.find(b => b.addr === 'A302.7'),
    outputs5.find(b => b.addr === 'A302.6')
  ],
  d: [
    B1C,
    B2C
  ]
}

var EL4 = {
  a: devices[3],
  b: measures.slice(9, 12),
  c: [
    inputs7.find(b => b.addr === 'E403.5'),
    outputs7.find(b => b.addr === 'A402.7'),
    outputs7.find(b => b.addr === 'A402.6')
  ],
  d: [
    B1D,
    B2D
  ]
}

export var overview = {
  devices: [EL1, EL2, EL3, EL4],
  exitQueue: {
    queueList: exitQueue,
    exitButton: B00
  }
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
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB0',
          bits: outputs[0]
        },
        {
          label: 'AB1',
          bits: outputs[1]
        },
        {
          label: 'AB2',
          bits: outputs[2]
        },
        {
          label: 'AB3',
          bits: outputs[3]
        }
      ]
    }
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'Elevator 1',
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
      type: '6ES7 521-1BL00-0AB0',
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
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB108',
          bits: inputs[12]
        },
        {
          label: 'EB109',
          bits: inputs[13]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB100',
          bits: outputs[4]
        },
        {
          label: 'AB101',
          bits: outputs[5]
        },
        {
          label: 'AB102',
          bits: outputs[6]
        },
        {
          label: 'AB103',
          bits: outputs[7]
        }
      ]
    },
    {
      nr: '5',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB104',
          bits: outputs[8]
        },
        {
          label: 'AB105',
          bits: outputs[9]
        },
        {
          label: 'AB106',
          bits: outputs[10]
        },
        {
          label: 'AB107',
          bits: outputs[11]
        }
      ]
    }
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'Shuttle 1',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB160',
          bits: inputs[14]
        },
        {
          label: 'EB161',
          bits: inputs[15]
        },
        {
          label: 'EB162',
          bits: inputs[16]
        },
        {
          label: 'EB163',
          bits: inputs[17]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB164',
          bits: inputs[18]
        },
        {
          label: 'EB165',
          bits: inputs[19]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB160',
          bits: outputs[12]
        },
        {
          label: 'AB161',
          bits: outputs[13]
        },
        {
          label: 'AB162',
          bits: outputs[14]
        },
        {
          label: 'AB163',
          bits: outputs[15]
        }
      ]
    }
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'Elevator 2',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB200',
          bits: inputs[20]
        },
        {
          label: 'EB201',
          bits: inputs[21]
        },
        {
          label: 'EB202',
          bits: inputs[22]
        },
        {
          label: 'EB203',
          bits: inputs[23]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB204',
          bits: inputs[24]
        },
        {
          label: 'EB205',
          bits: inputs[25]
        },
        {
          label: 'EB206',
          bits: inputs[26]
        },
        {
          label: 'EB207',
          bits: inputs[27]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB208',
          bits: inputs[28]
        },
        {
          label: 'EB209',
          bits: inputs[29]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB200',
          bits: outputs[16]
        },
        {
          label: 'AB201',
          bits: outputs[17]
        },
        {
          label: 'AB202',
          bits: outputs[18]
        },
        {
          label: 'AB203',
          bits: outputs[19]
        }
      ]
    },
    {
      nr: '5',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB204',
          bits: outputs[20]
        },
        {
          label: 'AB205',
          bits: outputs[21]
        },
        {
          label: 'AB206',
          bits: outputs[22]
        },
        {
          label: 'AB207',
          bits: outputs[23]
        }
      ]
    }
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200m',
  title: 'Shuttle 2',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB260',
          bits: inputs[30]
        },
        {
          label: 'EB261',
          bits: inputs[31]
        },
        {
          label: 'EB262',
          bits: inputs[32]
        },
        {
          label: 'EB263',
          bits: inputs[33]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB264',
          bits: inputs[34]
        },
        {
          label: 'EB265',
          bits: inputs[35]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB260',
          bits: outputs[24]
        },
        {
          label: 'AB261',
          bits: outputs[25]
        },
        {
          label: 'AB262',
          bits: outputs[26]
        },
        {
          label: 'AB263',
          bits: outputs[27]
        }
      ]
    }
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200m',
  title: 'Elevator 3',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB300',
          bits: inputs[36]
        },
        {
          label: 'EB301',
          bits: inputs[37]
        },
        {
          label: 'EB302',
          bits: inputs[38]
        },
        {
          label: 'EB303',
          bits: inputs[39]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB304',
          bits: inputs[40]
        },
        {
          label: 'EB305',
          bits: inputs[41]
        },
        {
          label: 'EB306',
          bits: inputs[42]
        },
        {
          label: 'EB307',
          bits: inputs[43]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB308',
          bits: inputs[44]
        },
        {
          label: 'EB309',
          bits: inputs[45]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB300',
          bits: outputs[28]
        },
        {
          label: 'AB301',
          bits: outputs[29]
        },
        {
          label: 'AB302',
          bits: outputs[30]
        },
        {
          label: 'AB303',
          bits: outputs[31]
        }
      ]
    },
    {
      nr: '5',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB304',
          bits: outputs[32]
        },
        {
          label: 'AB305',
          bits: outputs[33]
        },
        {
          label: 'AB306',
          bits: outputs[34]
        },
        {
          label: 'AB307',
          bits: outputs[35]
        }
      ]
    }
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200m',
  title: 'Shuttle 3',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB360',
          bits: inputs[46]
        },
        {
          label: 'EB361',
          bits: inputs[47]
        },
        {
          label: 'EB362',
          bits: inputs[48]
        },
        {
          label: 'EB363',
          bits: inputs[49]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB364',
          bits: inputs[50]
        },
        {
          label: 'EB365',
          bits: inputs[51]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB360',
          bits: outputs[36]
        },
        {
          label: 'AB361',
          bits: outputs[37]
        },
        {
          label: 'AB362',
          bits: outputs[38]
        },
        {
          label: 'AB363',
          bits: outputs[39]
        }
      ]
    }
  ]
}

const rack8 = {
  nr: 8,
  serie: 'et200m',
  title: 'Elevator 4',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB400',
          bits: inputs[52]
        },
        {
          label: 'EB401',
          bits: inputs[53]
        },
        {
          label: 'EB402',
          bits: inputs[54]
        },
        {
          label: 'EB403',
          bits: inputs[55]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB404',
          bits: inputs[56]
        },
        {
          label: 'EB405',
          bits: inputs[57]
        },
        {
          label: 'EB406',
          bits: inputs[58]
        },
        {
          label: 'EB407',
          bits: inputs[59]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB408',
          bits: inputs[60]
        },
        {
          label: 'EB409',
          bits: inputs[61]
        }
      ]
    },
    {
      nr: '4',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB400',
          bits: outputs[40]
        },
        {
          label: 'AB401',
          bits: outputs[41]
        },
        {
          label: 'AB402',
          bits: outputs[42]
        },
        {
          label: 'AB403',
          bits: outputs[43]
        }
      ]
    },
    {
      nr: '5',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB404',
          bits: outputs[44]
        },
        {
          label: 'AB405',
          bits: outputs[45]
        },
        {
          label: 'AB406',
          bits: outputs[46]
        },
        {
          label: 'AB407',
          bits: outputs[47]
        }
      ]
    }
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200m',
  title: 'Shuttle 4',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB460',
          bits: inputs[62]
        },
        {
          label: 'EB461',
          bits: inputs[63]
        },
        {
          label: 'EB462',
          bits: inputs[64]
        },
        {
          label: 'EB463',
          bits: inputs[65]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB464',
          bits: inputs[66]
        },
        {
          label: 'EB465',
          bits: inputs[67]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL00-0AB0',
      bytes: [
        {
          label: 'AB460',
          bits: outputs[48]
        },
        {
          label: 'AB461',
          bits: outputs[49]
        },
        {
          label: 'AB462',
          bits: outputs[50]
        },
        {
          label: 'AB463',
          bits: outputs[51]
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
  rack5,
  rack6,
  rack7,
  rack8,
  rack9
]

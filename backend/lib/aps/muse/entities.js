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

var alarms = []
for (let a = 0; a < 64; a++) {
  alarms.push(new Alarm(a + 1, 1, 0))
}
alarms.forEach((a, i) => {
  a.label = strings.alarms1[i].label
  a._info = strings.alarms1[i].info
})

var diag = {
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
  ]
}

// var inputs = []
// for (let e = 0; e < s7def.EB; e++) {
//   let E = []
//   for (let b = 0; b < s7def.BITS; b++) {
//     E.push(new Input(e, b, 0))
//   }
//   inputs.push(E)
// }

// var outputs = []
// for (let a = 0; a < s7def.AB; a++) {
//   let A = []
//   for (let b = 0; b < s7def.BITS; b++) {
//     A.push(new Output(a, b, 0))
//   }
//   outputs.push(A)
// }

// var merkers = []
// for (let m = 0; m < s7def.MB; m++) {
//   let M = []
//   for (let b = 0; b < s7def.BITS; b++) {
//     M.push(new Merker(m, b, 0))
//   }
//   merkers.push(M)
// }

var inputs1 = generateBits('E', 0, 5)
inputs1.forEach((b, i) => {
  b.label = strings.inputs1[i].label
  b._info = strings.inputs1[i].info
})
var inputs2 = generateBits('E', 100, 107)
inputs2.forEach((b, i) => {
  b.label = strings.inputs2[i].label
  b._info = strings.inputs2[i].info
})
var inputs3 = generateBits('E', 110, 111)
inputs3.forEach((b, i) => {
  b.label = strings.inputs3[i].label
  b._info = strings.inputs3[i].info
})
var inputs4 = generateBits('E', 200, 207)
inputs4.forEach((b, i) => {
  b.label = strings.inputs4[i].label
  b._info = strings.inputs4[i].info
})
var inputs5 = generateBits('E', 210, 211)
inputs5.forEach((b, i) => {
  b.label = strings.inputs5[i].label
  b._info = strings.inputs5[i].info
})
var inputs6 = generateBits('E', 300, 305)
inputs6.forEach((b, i) => {
  b.label = strings.inputs6[i].label
  b._info = strings.inputs6[i].info
})
var inputs7 = generateBits('E', 310, 314)
inputs7.forEach((b, i) => {
  b.label = strings.inputs7[i].label
  b._info = strings.inputs7[i].info
})
var inputs8 = generateBits('E', 400, 405)
inputs8.forEach((b, i) => {
  b.label = strings.inputs8[i].label
  b._info = strings.inputs8[i].info
})
var inputs9 = generateBits('E', 410, 414)
inputs9.forEach((b, i) => {
  b.label = strings.inputs9[i].label
  b._info = strings.inputs9[i].info
})

var inputs = generateByte(inputs1.concat(inputs2, inputs3, inputs4, inputs5, inputs6, inputs7, inputs8, inputs9))

var outputs1 = generateBits('A', 0, 3)
outputs1.forEach((b, i) => {
  b.label = strings.outputs1[i].label
  b._info = strings.outputs1[i].info
})
var outputs2 = generateBits('A', 100, 105)
outputs2.forEach((b, i) => {
  b.label = strings.outputs2[i].label
  b._info = strings.outputs2[i].info
})
var outputs3 = generateBits('A', 110, 110)
outputs3.forEach((b, i) => {
  b.label = strings.outputs3[i].label
  b._info = strings.outputs3[i].info
})
var outputs4 = generateBits('A', 200, 205)
outputs4.forEach((b, i) => {
  b.label = strings.outputs4[i].label
  b._info = strings.outputs4[i].info
})
var outputs5 = generateBits('A', 210, 210)
outputs5.forEach((b, i) => {
  b.label = strings.outputs5[i].label
  b._info = strings.outputs5[i].info
})
var outputs6 = generateBits('A', 300, 301)
outputs6.forEach((b, i) => {
  b.label = strings.outputs6[i].label
  b._info = strings.outputs6[i].info
})
var outputs7 = generateBits('A', 304, 304)
outputs7.forEach((b, i) => {
  b.label = strings.outputs7[i].label
  b._info = strings.outputs7[i].info
})
var outputs8 = generateBits('A', 310, 312)
outputs8.forEach((b, i) => {
  b.label = strings.outputs8[i].label
  b._info = strings.outputs8[i].info
})
var outputs9 = generateBits('A', 400, 401)
outputs9.forEach((b, i) => {
  b.label = strings.outputs9[i].label
  b._info = strings.outputs9[i].info
})
var outputs10 = generateBits('A', 404, 404)
outputs10.forEach((b, i) => {
  b.label = strings.outputs10[i].label
  b._info = strings.outputs10[i].info
})
var outputs11 = generateBits('A', 410, 412)
outputs11.forEach((b, i) => {
  b.label = strings.outputs11[i].label
  b._info = strings.outputs11[i].info
})

var outputs = generateByte(outputs1.concat(outputs2, outputs3, outputs4, outputs5, outputs6, outputs7, outputs8, outputs9, outputs10, outputs11))

var merkers1 = generateBits('M', 0, 7)
merkers1.forEach((b, i) => {
  b.label = strings.merkers1[i].label
  b._info = strings.merkers1[i].info
})

var merkers = generateByte(merkers1)

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

var cards = []
for (let c = 0; c < s7def.CARDS; c++) {
  cards.push(new Card(c + 1))
}

var devices = []
for (let d = 0; d < s7def.DEVICES; d++) {
  devices.push(new Device(d, strings.devices[d], strings.modes))
}

var measures = []
for (let d = 0; d < s7def.MEASURES; d++) {
  measures.push(new Measure(strings.measures[d]))
}

var operations = []
for (let o = 0; o < s7def.OPERATIONS; o++) {
  operations.push(new Operation(o, strings.operations[o]))
}

var exitQueue = []
for (let q = 0; q < s7def.QUEUE; q++) {
  exitQueue.push(new Queue(q))
}

var B00 = new Button(merkers1.find(b => b.addr === 'M3.5'), 'logout', 'Exit')
var B1A = new Button(merkers1.find(b => b.addr === 'M3.0'), 'login', 'Entry')
var B2A = new Button(merkers1.find(b => b.addr === 'M4.0'), 'rollback', 'Rollback')
var B1B = new Button(merkers1.find(b => b.addr === 'M3.1'), 'login', 'Entry')
var B2B = new Button(merkers1.find(b => b.addr === 'M4.1'), 'rollback', 'Rollback')
var B3B = new Button(merkers1.find(b => b.addr === 'M4.2'), 'rollback', 'Rollback')
var B4B = new Button(merkers1.find(b => b.addr === 'M4.3'), 'rollback', 'Rollback')

var EL1 = {
  a: devices[1],
  b: measures.slice(0, 4),
  c: [
    inputs2.find(b => b.addr === 'E103.3'),
    outputs2.find(b => b.addr === 'A103.7'),
    outputs2.find(b => b.addr === 'A103.6')
  ],
  d: [
    B1A,
    B2A
  ]
}

var EL2 = {
  a: devices[2],
  b: measures.slice(4, 8),
  c: [
    inputs4.find(b => b.addr === 'E203.3'),
    outputs4.find(b => b.addr === 'A203.7'),
    outputs4.find(b => b.addr === 'A203.6')
  ],
  d: [
    B1B,
    B2B
  ]
}

var EL3 = {
  a: devices[3],
  b: measures.slice(8, 12),
  c: [
    inputs6.find(b => b.addr === 'E301.3'),
    outputs6.find(b => b.addr === 'A300.7'),
    outputs6.find(b => b.addr === 'A300.6')
  ],
  d: [B3B]
}

var EL4 = {
  a: devices[4],
  b: measures.slice(12, 16),
  c: [
    inputs8.find(b => b.addr === 'E401.3'),
    outputs9.find(b => b.addr === 'A400.7'),
    outputs9.find(b => b.addr === 'A400.6')
  ],
  d: [B4B]
}

var overview = {
  devices: [
    EL1,
    EL2,
    EL3,
    EL4
  ],
  exitQueue: {
    queueList: exitQueue,
    exitButton: B00
  }
}

// console.log(overview.devices[0])

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

var stalls = []
for (let s = 0; s < s7def.STALLS; s++) {
  stalls.push(new Stall(s + 1, 0))
}

var map = {
  limits: {
    minCard: 1,
    maxCard: s7def.CARDS,
    minStall: 1,
    maxStall: s7def.STALLS
  },
  statistics: [
    TYPE_0,
    TYPE_1,
    TYPE_2
  ],
  levels: [
    {
      nr: 26,
      label: 'G26',
      min: 201,
      max: 208,
      stalls: stalls.slice(200, 208)
    },
    {
      nr: 25,
      label: 'G25',
      min: 193,
      max: 200,
      stalls: stalls.slice(192, 200)
    },
    {
      nr: 24,
      label: 'G24',
      min: 185,
      max: 192,
      stalls: stalls.slice(184, 192)
    },
    {
      nr: 23,
      label: 'G23',
      min: 177,
      max: 184,
      stalls: stalls.slice(176, 184)
    },
    {
      nr: 22,
      label: 'G22',
      min: 169,
      max: 176,
      stalls: stalls.slice(168, 176)
    },
    {
      nr: 21,
      label: 'G21',
      min: 161,
      max: 168,
      stalls: stalls.slice(160, 168)
    },
    {
      nr: 20,
      label: 'G20',
      min: 153,
      max: 160,
      stalls: stalls.slice(152, 160)
    },
    {
      nr: 19,
      label: 'G19',
      min: 145,
      max: 152,
      stalls: stalls.slice(144, 152)
    },
    {
      nr: 18,
      label: 'G18',
      min: 137,
      max: 144,
      stalls: stalls.slice(136, 144)
    },
    {
      nr: 17,
      label: 'G17',
      min: 129,
      max: 136,
      stalls: stalls.slice(128, 136)
    },
    {
      nr: 16,
      label: 'G16',
      min: 121,
      max: 128,
      stalls: stalls.slice(120, 128)
    },
    {
      nr: 15,
      label: 'G15',
      min: 113,
      max: 120,
      stalls: stalls.slice(112, 120)
    },
    {
      nr: 14,
      label: 'G14',
      min: 105,
      max: 112,
      stalls: stalls.slice(104, 112)
    },
    {
      nr: 13,
      label: 'G13',
      min: 97,
      max: 104,
      stalls: stalls.slice(96, 104)
    },
    {
      nr: 12,
      label: 'G12',
      min: 89,
      max: 96,
      stalls: stalls.slice(88, 96)
    },
    {
      nr: 11,
      label: 'G11',
      min: 81,
      max: 88,
      stalls: stalls.slice(80, 88)
    },
    {
      nr: 10,
      label: 'G10',
      min: 73,
      max: 80,
      stalls: stalls.slice(72, 80)
    },
    {
      nr: 9,
      label: 'G9',
      min: 65,
      max: 72,
      stalls: stalls.slice(64, 72)
    },
    {
      nr: 8,
      label: 'G8',
      min: 57,
      max: 64,
      stalls: stalls.slice(56, 64)
    },
    {
      nr: 7,
      label: 'G7',
      min: 49,
      max: 56,
      stalls: stalls.slice(48, 56)
    },
    {
      nr: 6,
      label: 'G6',
      min: 41,
      max: 48,
      stalls: stalls.slice(40, 48)
    },
    {
      nr: 5,
      label: 'G5',
      min: 33,
      max: 40,
      stalls: stalls.slice(32, 40)
    },
    {
      nr: 4,
      label: 'G4',
      min: 25,
      max: 32,
      stalls: stalls.slice(24, 32)
    },
    {
      nr: 3,
      label: 'G3',
      min: 17,
      max: 24,
      stalls: stalls.slice(16, 24)
    },
    {
      nr: 2,
      label: 'G2',
      min: 9,
      max: 16,
      stalls: stalls.slice(8, 16)
    },
    {
      nr: 1,
      label: 'G1',
      min: 1,
      max: 8,
      stalls: stalls.slice(0, 8)
    }
  ]
}

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
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB4',
          bits: inputs[4]
        },
        {
          label: 'EB5',
          bits: inputs[5]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL01-0AB0',
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
          bits: inputs[6]
        },
        {
          label: 'EB101',
          bits: inputs[7]
        },
        {
          label: 'EB102',
          bits: inputs[8]
        },
        {
          label: 'EB103',
          bits: inputs[9]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB104',
          bits: inputs[10]
        },
        {
          label: 'EB105',
          bits: inputs[11]
        },
        {
          label: 'EB106',
          bits: inputs[12]
        },
        {
          label: 'EB107',
          bits: inputs[13]
        }
      ]
    },
    {
      nr: '3',
      type: '6ES7 522-1BL01-0AB0',
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
      nr: '4',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB104',
          bits: outputs[8]
        },
        {
          label: 'AB105',
          bits: outputs[9]
        }
      ]
    }
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'Elevator 1 (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB110',
          bits: inputs[14]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB111',
          bits: inputs[15]
        }
      ]
    },
    {
      nr: '3',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB110',
          bits: outputs[10]
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
          bits: inputs[16]
        },
        {
          label: 'EB201',
          bits: inputs[17]
        },
        {
          label: 'EB202',
          bits: inputs[18]
        },
        {
          label: 'EB203',
          bits: inputs[19]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 521-1BH01-0AB0',
      bytes: [
        {
          label: 'EB204',
          bits: inputs[20]
        },
        {
          label: 'EB205',
          bits: inputs[21]
        },
        {
          label: 'EB206',
          bits: inputs[22]
        },
        {
          label: 'EB207',
          bits: inputs[23]
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
  title: 'Elevator 2 (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB210',
          bits: inputs[24]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB211',
          bits: inputs[25]
        }
      ]
    },
    {
      nr: '3',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB210',
          bits: outputs[17]
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
          bits: inputs[26]
        },
        {
          label: 'EB301',
          bits: inputs[27]
        },
        {
          label: 'EB302',
          bits: inputs[28]
        },
        {
          label: 'EB303',
          bits: inputs[29]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB300',
          bits: outputs[18]
        },
        {
          label: 'AB301',
          bits: outputs[19]
        }
      ]
    }
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200s',
  title: 'Elevator 3 (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB304',
          bits: inputs[30]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB305',
          bits: inputs[31]
        }
      ]
    },
    {
      nr: '3',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB304',
          bits: outputs[20]
        }
      ]
    }
  ]
}

const rack8 = {
  nr: 8,
  serie: 'et200s',
  title: 'Elevator 3 (KKS)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB310',
          bits: inputs[32]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB311',
          bits: inputs[33]
        }
      ]
    },
    {
      nr: '3',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB312',
          bits: inputs[34]
        }
      ]
    },
    {
      nr: '4',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB313',
          bits: inputs[35]
        }
      ]
    },
    {
      nr: '5',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB314',
          bits: inputs[36]
        }
      ]
    },
    {
      nr: '6',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB310',
          bits: outputs[21]
        }
      ]
    },
    {
      nr: '7',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB311',
          bits: outputs[22]
        }
      ]
    },
    {
      nr: '8',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB312',
          bits: outputs[23]
        }
      ]
    }
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200m',
  title: 'Elevator 4',
  cards: [
    {
      nr: '1',
      type: '6ES7 521-1BL00-0AB0',
      bytes: [
        {
          label: 'EB400',
          bits: inputs[37]
        },
        {
          label: 'EB401',
          bits: inputs[38]
        },
        {
          label: 'EB402',
          bits: inputs[39]
        },
        {
          label: 'EB403',
          bits: inputs[40]
        }
      ]
    },
    {
      nr: '2',
      type: '6ES7 522-1BH01-0AB0',
      bytes: [
        {
          label: 'AB400',
          bits: outputs[24]
        },
        {
          label: 'AB401',
          bits: outputs[25]
        }
      ]
    }
  ]
}

const rack10 = {
  nr: 10,
  serie: 'et200s',
  title: 'Elevator 4 (KKP)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB404',
          bits: inputs[41]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB405',
          bits: inputs[42]
        }
      ]
    },
    {
      nr: '3',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB404',
          bits: outputs[26]
        }
      ]
    }
  ]
}

const rack11 = {
  nr: 11,
  serie: 'et200s',
  title: 'Elevator 4 (KKS)',
  cards: [
    {
      nr: '1',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB410',
          bits: inputs[43]
        }
      ]
    },
    {
      nr: '2',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB411',
          bits: inputs[44]
        }
      ]
    },
    {
      nr: '3',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB412',
          bits: inputs[45]
        }
      ]
    },
    {
      nr: '4',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB413',
          bits: inputs[46]
        }
      ]
    },
    {
      nr: '5',
      type: '131-6BF00-0BA0',
      bytes: [
        {
          label: 'EB414',
          bits: inputs[47]
        }
      ]
    },
    {
      nr: '6',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB410',
          bits: outputs[27]
        }
      ]
    },
    {
      nr: '7',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB411',
          bits: outputs[28]
        }
      ]
    },
    {
      nr: '8',
      type: '132-6BF00-0BA0',
      bytes: [
        {
          label: 'AB412',
          bits: outputs[29]
        }
      ]
    }
  ]
}

const racks = [
  rack1,
  rack2,
  rack3,
  rack4,
  rack5,
  rack6,
  rack7,
  rack8,
  rack9,
  rack10,
  rack11
]

export {
  inputs,
  outputs,
  merkers,
  cards,
  devices,
  measures,
  operations,
  exitQueue,
  overview,
  stalls,
  alarms,
  diag,
  map,
  racks
}

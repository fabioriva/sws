// import * as strings from './strings'

class Bit {
  constructor (byte, bit, status) {
    this.byte = byte
    this.bit = bit
    this.status = status
  }
  get _info () {
    return this.info
  }
  set _info (info) {
    if (info) {
      this.info = info
    }
  }
}

export class Input extends Bit {
  constructor (byte, bit, status) {
    super(byte, bit, status)
    this.addr = 'E' + byte.toString() + '.' + bit.toString()
    this.type = 'E'
  }
}

export class Output extends Bit {
  constructor (byte, bit, status) {
    super(byte, bit, status)
    this.addr = 'A' + byte.toString() + '.' + bit.toString()
    this.type = 'A'
  }
}

export class Merker extends Bit {
  constructor (byte, bit, status) {
    super(byte, bit, status)
    this.addr = 'M' + byte.toString() + '.' + bit.toString()
    this.type = 'M'
  }
}

export class Alarm {
  constructor (id, device, status) {
    this.id = id
    this.device = device
    this.status = status
  }
  get _info () {
    return this.info
  }
  set _info (info) {
    if (info) {
      this.info = info
    }
  }
}

export class Button {
  constructor (merker, action, icon, label) {
    this.merker = merker
    this.action = action
    this.icon = icon
    this.label = label
  }
}

export class Card {
  constructor (nr, code, from, to) {
    this.nr = nr
    this.code = code
    this.from = from || new Date()
    this.to = to || new Date()
    this.rand = this.getRandomIntInclusive(256, 4095).toString(16).toUpperCase()
  }
  getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export class Operation {
  constructor (id, info) {
    this.id = id
    this.info = info
  }
}

export class Device {
  constructor (id, name, modes, card, mode, motor, operation, position, size, stall, step) {
    this.id = id
    this.name = name // this.setName(id)
    this.modes = modes
    this.card = card
    this.mode = this.setMode(mode)
    this.motor = motor
    this.operation = operation
    this.position = position
    this.size = size
    this.stall = stall
    this.step = step
  }
  // setName (id) {
  //   return id < strings.devices.length ? strings.devices[id] : '---'
  // }
  setMode (mode) {
    return mode < this.modes.length ? this.modes[mode] : '---'
  }
}

export class Measure {
  constructor (id) {
    this.name = id // this.setName(id)
  }
  // setName (id) {
  //   return id < strings.measures.length ? strings.measures[id] : '---'
  // }
}

export class Queue {
  constructor (id) {
    this.id = id + 1
  }
}

export class Stall {
  constructor (nr, status, date, size) {
    this.nr = nr
    this.status = status
    this.date = date || new Date()
    this.size = size
  }
}

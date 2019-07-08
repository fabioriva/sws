import moment from 'moment'
import * as utils from './utils'
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
  constructor (merker, icon, label) {
    this.merker = merker
    this.icon = icon
    this.label = label
  }
}

export class Card {
  constructor (nr, code, from, to) {
    this.nr = nr
    this.code = code
    this.from = from // || moment().hours(0).minutes(0).seconds(0)
    this.to = to // || moment().hours(23).minutes(59).seconds(59)
    this.rand = this.getRandomIntInclusive(256, 4095).toString(16).toUpperCase()
  }
  getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  update (code, from, to) {
    this.code = code.toString(16).toUpperCase()
    this.from = moment(utils.getPLCDateTime(0, from)).format('HH:mm:ss')
    this.to = moment(utils.getPLCDateTime(0, to)).format('HH:mm:ss')
  }
}

export class Device {
  constructor (id, name, modes, card = 0, mode = 0, motor = 0, operation = 0, position = 0, size = 0, stall = 0, step = 0) {
    this.id = id
    this.name = name // this.setName(id)
    this.modes = modes
    this.card = card
    this.mode = {
      label: this.setMode(mode),
      id: mode
    }
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
  constructor (id, destination = 0, position = 0) {
    this.name = id // this.setName(id)
    this.destination = destination
    this.position = position
  }
  // setName (id) {
  //   return id < strings.measures.length ? strings.measures[id] : '---'
  // }
}

export class Operation {
  constructor (id, info) {
    this.id = id
    this.info = info
  }
}

export class Step {
  constructor (id, info, type = 0, data = []) {
    this.id = id
    this.info = info
    this.type = type
    this.data = data
  }
}

export class Queue {
  constructor (id, card = 0, stall = 0) {
    this.id = id + 1
    this.card = card
    this.stall = stall
  }
}

export class Stall {
  constructor (nr, status, date, size) {
    this.nr = nr
    this.status = status
    this.date = date // || moment().format('YYYY-MM-DD HH:mm:ss')
    this.size = size
  }
  update (status, days, msec, size) {
    // console.log(status, days, msec, size)
    this.status = status
    this.date = moment(utils.getPLCDateTime(days, msec)).format('YYYY-MM-DD HH:mm:ss')
    this.size = size
    // console.log(this.nr, this.status, this.date, this.size)
  }
}

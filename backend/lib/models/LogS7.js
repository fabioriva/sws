export default class Log {
  constructor (data) {
    this.stx = this.bytesToInt(data[0], data[1])
    this.system = this.bytesToInt(data[2], data[3])
    this.device = this.bytesToInt(data[4], data[5])
    this.mode = this.bytesToInt(data[6], data[7])
    this.operation = this.bytesToInt(data[8], data[9])
    this.stall = this.bytesToInt(data[10], data[11])
    this.card = this.bytesToInt(data[12], data[13])
    this.size = this.bytesToInt(data[14], data[15])
    this.alarm = this.bytesToInt(data[16], data[17])
    this.event = this.bytesToInt(data[18], data[19])
    this.date = this.getPLCDateTime(this.bytesToInt(data[20], data[21]), this.bytesToLong(data[22], data[23], data[24], data[25]))
    this.elapsed = this.bytesToLong(data[26], data[27], data[28], data[29])
    this.etx = this.bytesToInt(data[30], data[31])
  }
  bytesToInt (b1, b2) {
    return (b1 << 8) | b2
  }
  bytesToLong (b1, b2, b3, b4) {
    return (b1 << 24) | (b2 << 16) | (b3 << 8) | b4
  }
  getPLCDateTime (days, msec) {
    let h = Math.floor(msec / 3600000)
    let m = Math.floor((msec % 3600000) / 60000)
    let s = Math.floor(((msec % 3600000) % 60000) / 1000)
    let ms = Math.floor(((msec % 3600000) % 60000) % 1000)
    let d = new Date(1990, 0, 1, h, m, s, ms)
    return d.setDate(d.getDate() + days)
  }
}

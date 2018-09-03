import * as fs from 'fs'
import {
  BITS
} from './def'

const FILE = 'lib/ws/aps/muse/strings_.js'

generateBitsInfo('inputs1', 'E', 0, 5)
generateBitsInfo('inputs2', 'E', 100, 107)
generateBitsInfo('inputs3', 'E', 110, 111)
generateBitsInfo('inputs4', 'E', 200, 207)
generateBitsInfo('inputs5', 'E', 210, 211)
generateBitsInfo('inputs6', 'E', 300, 305)
generateBitsInfo('inputs7', 'E', 310, 314)
generateBitsInfo('inputs8', 'E', 400, 405)
generateBitsInfo('inputs9', 'E', 410, 414)

generateBitsInfo('outputs1', 'A', 0, 3)
generateBitsInfo('outputs2', 'A', 100, 105)
generateBitsInfo('outputs3', 'A', 110, 110)
generateBitsInfo('outputs4', 'A', 200, 205)
generateBitsInfo('outputs5', 'A', 210, 210)
generateBitsInfo('outputs6', 'A', 300, 301)
generateBitsInfo('outputs7', 'A', 304, 304)
generateBitsInfo('outputs8', 'A', 310, 312)
generateBitsInfo('outputs9', 'A', 400, 401)
generateBitsInfo('outputs10', 'A', 404, 404)
generateBitsInfo('outputs11', 'A', 410, 412)

generateBitsInfo('merkers1', 'M', 0, 7)

function generateBitsInfo (name, type, min, max) {
  fs.appendFileSync(FILE, `export const ${name} = [\r\n`)
  for (let e = min; e <= max; e++) {
    for (let b = 0; b < BITS; b++) {
      fs.appendFileSync(FILE, `  { addr: '${type}${e}.${b}', label: '', info: '' },\r\n`)
    }
  }
  fs.appendFileSync(FILE, `]\r\n`)
}

generateAlarmsInfo('alarms1', 'EU', 0, 64)

function generateAlarmsInfo (name, group, min, max) {
  fs.appendFileSync(FILE, `export const ${name} = [\r\n`)
  for (let a = min; a < max; a++) {
    fs.appendFileSync(FILE, `  { class: '${group}', label: 'AL${a + 1}', info: '' },\r\n`)
  }
  fs.appendFileSync(FILE, `]\r\n`)
}

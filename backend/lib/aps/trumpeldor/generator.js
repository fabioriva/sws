import * as fs from 'fs'
import {
  BITS
} from './def'

const FILE = 'lib/aps/trumpeldor/strings_.js'

generateBitsInfo('inputs1', 'E', 4, 13)
generateBitsInfo('inputs2', 'E', 14, 17)

generateBitsInfo('outputs1', 'A', 4, 9)
generateBitsInfo('outputs2', 'A', 14, 15)

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

generateAlarmsInfo('alarms1', 'EL', 0, 64)

function generateAlarmsInfo (name, group, min, max) {
  fs.appendFileSync(FILE, `export const ${name} = [\r\n`)
  for (let a = min; a < max; a++) {
    fs.appendFileSync(FILE, `  { class: '${group}', label: 'AL${a + 1}', info: '' },\r\n`)
  }
  fs.appendFileSync(FILE, `]\r\n`)
}

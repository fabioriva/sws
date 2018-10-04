import * as fs from 'fs'
import {
  BITS
} from './def'

const FILE = 'lib/aps/bassano/strings_.js'

generateBitsInfo('inputs1', 'E', 0, 3)
generateBitsInfo('inputs2', 'E', 10, 17)
generateBitsInfo('inputs3', 'E', 20, 27)
generateBitsInfo('inputs4', 'E', 30, 31)
generateBitsInfo('inputs5', 'E', 40, 43)

generateBitsInfo('outputs1', 'A', 0, 1)
generateBitsInfo('outputs2', 'A', 10, 15)
generateBitsInfo('outputs3', 'A', 20, 25)
generateBitsInfo('outputs4', 'A', 30, 31)
generateBitsInfo('outputs5', 'A', 40, 42)

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

generateAlarmsInfo('alarms1', 'A', 0, 64)
generateAlarmsInfo('alarms2', 'B', 0, 64)
generateAlarmsInfo('alarms3', 'T', 0, 64)

function generateAlarmsInfo (name, group, min, max) {
  fs.appendFileSync(FILE, `export const ${name} = [\r\n`)
  for (let a = min; a < max; a++) {
    fs.appendFileSync(FILE, `  { class: '${group}', label: 'AL${a + 1}', info: '' },\r\n`)
  }
  fs.appendFileSync(FILE, `]\r\n`)
}

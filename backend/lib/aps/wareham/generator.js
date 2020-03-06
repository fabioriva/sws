import * as fs from 'fs'
import {
  BITS
} from './def'

const FILE = 'lib/aps/wareham/strings_.js'

generateBitsInfo('inputs1', 'E', 0, 3)
generateBitsInfo('inputs2', 'E', 100, 109)
generateBitsInfo('inputs3', 'E', 110, 112)
generateBitsInfo('inputs4', 'E', 200, 209)
generateBitsInfo('inputs5', 'E', 210, 212)
generateBitsInfo('inputs6', 'E', 4, 4)

generateBitsInfo('outputs1', 'A', 0, 1)
generateBitsInfo('outputs2', 'A', 100, 105)
generateBitsInfo('outputs3', 'A', 110, 111)
generateBitsInfo('outputs4', 'A', 200, 205)
generateBitsInfo('outputs5', 'A', 210, 211)
generateBitsInfo('outputs6', 'A', 4, 4)

generateBitsInfo('merkers1', 'M', 0, 7)

function generateBitsInfo (name, type, min, max) {
  fs.appendFileSync(FILE, `export const ${name} = [\r\n`)
  for (let e = min; e <= max; e++) {
    for (let b = 0; b < BITS; b++) {
      fs.appendFileSync(FILE, `  { addr: '${type}${e}.${b}', label: '', info: '' },\r\n`)
    }
  }
  fs.appendFileSync(FILE, ']\r\n')
}

generateAlarmsInfo('alarms1', 'SH1', 0, 64)
generateAlarmsInfo('alarms2', 'SH2', 0, 64)
generateAlarmsInfo('alarms3', 'EL1', 0, 64)
generateAlarmsInfo('alarms4', 'EL2', 0, 64)

function generateAlarmsInfo (name, group, min, max) {
  fs.appendFileSync(FILE, `export const ${name} = [\r\n`)
  for (let a = min; a < max; a++) {
    fs.appendFileSync(FILE, `  { class: '${group}', label: 'AL${a + 1}', info: '' },\r\n`)
  }
  fs.appendFileSync(FILE, ']\r\n')
}

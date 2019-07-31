import { Tooltip } from 'antd'

const Bit = (props) => {
  const { serie, byteNr, bitNr, bit } = props
  const { info, label, status } = bit
  const FALSE = <div className={`bit-st bit-st-${serie} b${byteNr}-i${bitNr}-st-${serie} bit-false`}>{status}</div>
  const TRUE = <div className={`bit-st bit-st-${serie} b${byteNr}-i${bitNr}-st-${serie} bit-true`}>{status}</div>
  return (
    <>
      <Tooltip placement='top' title={info || 'No description'}>
        <div className={`bit-id bit-id-${serie} b${byteNr}-i${bitNr}-id-${serie}`}>{label}</div>
      </Tooltip>
      {
        status ? TRUE : FALSE
      }
      <div className={`bit-nr bit-nr-${serie} b${byteNr}-i${bitNr}-nr-${serie}`}>{bitNr}</div>
      <style jsx global>{`
        .bit-id {
          position: absolute;
          height: 18px;
          line-height: 18px;
          background-color: #FFFFFF;
          border: 1px solid #000000;
          font-size: 0.78em;
        }
        .bit-st {
          position: absolute;
          height: 18px;
          width: 12px;
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
        }
        .bit-nr {
          position: absolute;
          height: 18px;
          width: 12px;
          line-height: 18px;
          background-color: #E0E0E0;
          border: 1px solid #000000;
        }
        .bit-false {
          background-color: #C0C0C0;
        }
        .bit-true {
          background-color: #00FF00;
        }
        .bit-id-et200m {
          width: 45px;
        }
        .bit-st-et200m {
          width: 12px;
        }
        .bit-nr-et200m {
          width: 12px;
        }
        .bit-id-et200s {
          width: 65px;
        }
        .bit-st-et200s {
          width: 12px;
        }
        .bit-nr-et200s {
          width: 12px;
        }
        .b0-i0-id-et200m {
          left: 34px;
          top: 23px;
        }
        .b0-i0-st-et200m {
          left: 22px;
          top: 23px;
        }
        .b0-i0-nr-et200m {
          left: 10px;
          top: 23px;
        }
        .b0-i1-id-et200m {
          left: 34px;
          top: 40px;
        }
        .b0-i1-st-et200m {
          left: 22px;
          top: 40px;
        }
        .b0-i1-nr-et200m {
          left: 10px;
          top: 40px;
        }
        .b0-i2-id-et200m {
          left: 34px;
          top: 57px;
        }
        .b0-i2-st-et200m {
          left: 22px;
          top: 57px;
        }
        .b0-i2-nr-et200m {
          left: 10px;
          top: 57px;
        }
        .b0-i3-id-et200m {
          left: 34px;
          top: 74px;
        }
        .b0-i3-st-et200m {
          left: 22px;
          top: 74px;
        }
        .b0-i3-nr-et200m {
          left: 10px;
          top: 74px;
        }
        .b0-i4-id-et200m {
          left: 34px;
          top: 91px;
        }
        .b0-i4-st-et200m {
          left: 22px;
          top: 91px;
        }
        .b0-i4-nr-et200m {
          left: 10px;
          top: 91px;
        }
        .b0-i5-id-et200m {
          left: 34px;
          top: 108px;
        }
        .b0-i5-st-et200m {
          left: 22px;
          top: 108px;
        }
        .b0-i5-nr-et200m {
          left: 10px;
          top: 108px;
        }
        .b0-i6-id-et200m {
          left: 34px;
          top: 125px;
        }
        .b0-i6-st-et200m {
          left: 22px;
          top: 125px;
        }
        .b0-i6-nr-et200m {
          left: 10px;
          top: 125px;
        }
        .b0-i7-id-et200m {
          left: 34px;
          top: 142px;
        }
        .b0-i7-st-et200m {
          left: 22px;
          top: 142px;
        }
        .b0-i7-nr-et200m {
          left: 10px;
          top: 142px;
        }
        .b1-i0-id-et200m {
          left: 34px;
          top: 193px;
        }
        .b1-i0-st-et200m {
          left: 22px;
          top: 193px;
        }
        .b1-i0-nr-et200m {
          left: 10px;
          top: 193px;
        }
        .b1-i1-id-et200m {
          left: 34px;
          top: 210px;
        }
        .b1-i1-st-et200m {
          left: 22px;
          top: 210px;
        }
        .b1-i1-nr-et200m {
          left: 10px;
          top: 210px;
        }
        .b1-i2-id-et200m {
          left: 34px;
          top: 227px;
        }
        .b1-i2-st-et200m {
          left: 22px;
          top: 227px;
        }
        .b1-i2-nr-et200m {
          left: 10px;
          top: 227px;
        }
        .b1-i3-id-et200m {
          left: 34px;
          top: 244px;
        }
        .b1-i3-st-et200m {
          left: 22px;
          top: 244px;
        }
        .b1-i3-nr-et200m {
          left: 10px;
          top: 244px;
        }
        .b1-i4-id-et200m {
          left: 34px;
          top: 261px;
        }
        .b1-i4-st-et200m {
          left: 22px;
          top: 261px;
        }
        .b1-i4-nr-et200m {
          left: 10px;
          top: 261px;
        }
        .b1-i5-id-et200m {
          left: 34px;
          top: 278px;
        }
        .b1-i5-st-et200m {
          left: 22px;
          top: 278px;
        }
        .b1-i5-nr-et200m {
          left: 10px;
          top: 278px;
        }
        .b1-i6-id-et200m {
          left: 34px;
          top: 295px;
        }
        .b1-i6-st-et200m {
          left: 22px;
          top: 295px;
        }
        .b1-i6-nr-et200m {
          left: 10px;
          top: 295px;
        }
        .b1-i7-id-et200m {
          left: 34px;
          top: 312px;
        }
        .b1-i7-st-et200m {
          left: 22px;
          top: 312px;
        }
        .b1-i7-nr-et200m {
          left: 10px;
          top: 312px;
        }
        .b2-i0-id-et200m {
          left: 78px;
          top: 23px;
        }
        .b2-i0-st-et200m {
          left: 123px;
          top: 23px;
        }
        .b2-i0-nr-et200m {
          left: 135px;
          top: 23px;
        }
        .b2-i1-id-et200m {
          left: 78px;
          top: 40px;
        }
        .b2-i1-st-et200m {
          left: 123px;
          top: 40px;
        }
        .b2-i1-nr-et200m {
          left: 135px;
          top: 40px;
        }
        .b2-i2-id-et200m {
          left: 78px;
          top: 57px;
        }
        .b2-i2-st-et200m {
          left: 123px;
          top: 57px;
        }
        .b2-i2-nr-et200m {
          left: 135px;
          top: 57px;
        }
        .b2-i3-id-et200m {
          left: 78px;
          top: 74px;
        }
        .b2-i3-st-et200m {
          left: 123px;
          top: 74px;
        }
        .b2-i3-nr-et200m {
          left: 135px;
          top: 74px;
        }
        .b2-i4-id-et200m {
          left: 78px;
          top: 91px;
        }
        .b2-i4-st-et200m {
          left: 123px;
          top: 91px;
        }
        .b2-i4-nr-et200m {
          left: 135px;
          top: 91px;
        }
        .b2-i5-id-et200m {
          left: 78px;
          top: 108px;
        }
        .b2-i5-st-et200m {
          left: 123px;
          top: 108px;
        }
        .b2-i5-nr-et200m {
          left: 135px;
          top: 108px;
        }
        .b2-i6-id-et200m {
          left: 78px;
          top: 125px;
        }
        .b2-i6-st-et200m {
          left: 123px;
          top: 125px;
        }
        .b2-i6-nr-et200m {
          left: 135px;
          top: 125px;
        }
        .b2-i7-id-et200m {
          left: 78px;
          top: 142px;
        }
        .b2-i7-st-et200m {
          left: 123px;
          top: 142px;
        }
        .b2-i7-nr-et200m {
          left: 135px;
          top: 142px;
        }
        .b3-i0-id-et200m {
          left: 78px;
          top: 193px;
        }
        .b3-i0-st-et200m {
          left: 123px;
          top: 193px;
        }
        .b3-i0-nr-et200m {
          left: 135px;
          top: 193px;
        }
        .b3-i1-id-et200m {
          left: 78px;
          top: 210px;
        }
        .b3-i1-st-et200m {
          left: 123px;
          top: 210px;
        }
        .b3-i1-nr-et200m {
          left: 135px;
          top: 210px;
        }
        .b3-i2-id-et200m {
          left: 78px;
          top: 227px;
        }
        .b3-i2-st-et200m {
          left: 123px;
          top: 227px;
        }
        .b3-i2-nr-et200m {
          left: 135px;
          top: 227px;
        }
        .b3-i3-id-et200m {
          left: 78px;
          top: 244px;
        }
        .b3-i3-st-et200m {
          left: 123px;
          top: 244px;
        }
        .b3-i3-nr-et200m {
          left: 135px;
          top: 244px;
        }
        .b3-i4-id-et200m {
          left: 78px;
          top: 261px;
        }
        .b3-i4-st-et200m {
          left: 123px;
          top: 261px;
        }
        .b3-i4-nr-et200m {
          left: 135px;
          top: 261px;
        }
        .b3-i5-id-et200m {
          left: 78px;
          top: 278px;
        }
        .b3-i5-st-et200m {
          left: 123px;
          top: 278px;
        }
        .b3-i5-nr-et200m {
          left: 135px;
          top: 278px;
        }
        .b3-i6-id-et200m {
          left: 78px;
          top: 295px;
        }
        .b3-i6-st-et200m {
          left: 123px;
          top: 295px;
        }
        .b3-i6-nr-et200m {
          left: 135px;
          top: 295px;
        }
        .b3-i7-id-et200m {
          left: 78px;
          top: 312px;
        }
        .b3-i7-st-et200m {
          left: 123px;
          top: 312px;
        }
        .b3-i7-nr-et200m {
          left: 135px;
          top: 312px;
        }
        .b0-i0-id-et200s {
          left: 10px;
          top: 25px;
        }
        .b0-i0-st-et200s {
          left: 10px;
          top: 203px;
        }
        .b0-i0-nr-et200s {
          left: 22px;
          top: 203px;
        }
        .b0-i1-id-et200s {
          left: 10px;
          top: 42px;
        }
        .b0-i1-st-et200s {
          left: 50px;
          top: 203px;
        }
        .b0-i1-nr-et200s {
          left: 62px;
          top: 203px;
        }
        .b0-i2-id-et200s {
          left: 10px;
          top: 59px;
        }
        .b0-i2-st-et200s {
          left: 10px;
          top: 220px;
        }
        .b0-i2-nr-et200s {
          left: 22px;
          top: 220px;
        }
        .b0-i3-id-et200s {
          left: 10px;
          top: 76px;
        }
        .b0-i3-st-et200s {
          left: 50px;
          top: 220px;
        }
        .b0-i3-nr-et200s {
          left: 62px;
          top: 220px;
        }
        .b0-i4-id-et200s {
          left: 10px;
          top: 93px;
        }
        .b0-i4-st-et200s {
          left: 10px;
          top: 237px;
        }
        .b0-i4-nr-et200s {
          left: 22px;
          top: 237px;
        }
        .b0-i5-id-et200s {
          left: 10px;
          top: 110px;
        }
        .b0-i5-st-et200s {
          left: 50px;
          top: 237px;
        }
        .b0-i5-nr-et200s {
          left: 62px;
          top: 237px;
        }
        .b0-i6-id-et200s {
          left: 10px;
          top: 127px;
        }
        .b0-i6-st-et200s {
          left: 10px;
          top: 254px;
        }
        .b0-i6-nr-et200s {
          left: 22px;
          top: 254px;
        }
        .b0-i7-id-et200s {
          left: 10px;
          top: 144px;
        }
        .b0-i7-st-et200s {
          left: 50px;
          top: 254px;
        }
        .b0-i7-nr-et200s {
          left: 62px;
          top: 254px;
        }
     `}</style>
    </>
  )
}

const Byte = (props) => {
  const { rack, serie, byteNr, byte } = props
  const { bits, label } = byte
  return (
    <>
      <div className={`label label-${serie} label-${byteNr}-${serie}`}>{label}</div>
      {
        bits.map((bit, i) => <Bit key={i} rack={rack} serie={serie} byteNr={byteNr} bitNr={i} bit={bit} />)
      }
      <style jsx>{`
        .label {
          position: absolute;
          background-color: #FFFF00;
          border: 1px solid #000000;
          font-size: 14px;
        }
        .label-et200m {
          height: 18px;
          width: 69px;
        }
        .label-et200s {
          height: 18px;
          width: 65px;
        }
        .label-0-et200m {
          left: 10px;
          top: 159px;
        }
        .label-1-et200m {
          left: 10px;
          top: 176px;
        }
        .label-2-et200m {
          left: 78px;
          top: 159px;
        }
        .label-3-et200m {
          left: 78px;
          top: 176px;
        }
        .label-0-et200s {
          left: 10px;
          top: 172px;
        }
     `}</style>
    </>
  )
}

const Card = (props) => {
  const { rack, serie, card } = props
  const { nr, type, bytes } = card
  return (
    <div className={`card card-${serie} card-${nr}-${serie}`}>
      <div className={`title title-${serie}`}>Card {nr}</div>
      <div className={`type type-${serie}`}>{type}</div>
      {
        bytes.map((byte, i) => <Byte key={i} rack={rack} serie={serie} byteNr={i} byte={byte} />)
      }
      <style jsx>{`
        .card {
          position: absolute;
          border: 1px solid #000000;
          background-color: #505050;
          color: #000000;
          text-align: center;
          vertical-align: middle;
          line-height: 16px;
          height: 360px;
          width: ${serie === 'et200m' ? '160' : '88'}px;
        }
        .title {
          height: 18px;
          color: #FFFF00;
        }
        .type {
          position: absolute;
          right: 10px;
          top: 342px;
          height: 18px;
          color: #F0F0F0;
          font-family: "Arial", Sans-Serif;
          font-size: 0.58em;
        }

        .card-1-et200m {
          left: 1px;
          top: 1px;
        }
        .card-2-et200m {
          left: 162px;
          top: 1px;
        }
        .card-3-et200m {
          left: 323px;
          top: 1px;
        }
        .card-4-et200m {
          left: 484px;
          top: 1px;
        }
        .card-5-et200m {
          left: 645px;
          top: 1px;
        }
        .card-6-et200m {
          left: 806px;
          top: 1px;
        }
        .card-7-et200m {
          left: 967px;
          top: 1px;
        }
        .card-8-et200m {
          left: 1128px;
          top: 1px;
        }
        .card-1-et200s {
          left: 1px;
          top: 1px;
        }
        .card-2-et200s {
          left: 90px;
          top: 1px;
        }
        .card-3-et200s {
          left: 179px;
          top: 1px;
        }
        .card-4-et200s {
          left: 268px;
          top: 1px;
        }
        .card-5-et200s {
          left: 357px;
          top: 1px;
        }
        .card-6-et200s {
          left: 446px;
          top: 1px;
        }
        .card-7-et200s {
          left: 535px;
          top: 1px;
        }
        .card-8-et200s {
          left: 624px;
          top: 1px;
        }
     `}</style>
    </div>
  )
}

const Rack = (props) => {
  const { cards, nr, serie } = props.rack
  return (
    <div className='rack-container' id={'rack-' + nr}>
      <span className='rack'>Simatic PLC Rack {nr}</span>
      {
        cards.map((card, i) => <Card key={i} rack={nr} serie={serie} card={card} />)
      }
      <style jsx>{`
        .rack-container {
          position: relative;
          background-color: #c0c0c0;
          border: 1px solid #000000;
          height: 364px;
          width: 100%;
          left: 0px;
          top: 20px;
          text-align: center;
        }
        .rack {
          color: #808080;
          font-family: "Arial", Sans-Serif;
          font-size: 48px;
          font-weight: 600;
          vertical-align: middle;
          line-height: 364px;
        }
      `}</style>
    </div>
  )
}

export default Rack

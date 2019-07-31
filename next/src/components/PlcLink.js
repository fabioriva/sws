import Link from 'next/link'

const PlcLink = (props) => (
  <li>
    <Link
      as={`/${props.aps}/rack/${props.rackNumber}`}
      href={`/${props.aps}/rack/[rackNumber]`}
    >
      <a>{props.rack.title}</a>
    </Link>
  </li>
)

export default PlcLink

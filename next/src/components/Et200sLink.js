import Link from 'next/link'

const Et200sLink = (props) => (
  <li>
    <Link
      as={`/${props.aps}/rack/s/${props.rackNumber + 1}`}
      href={`/${props.aps}/plc/et200s?rackNumber=${props.rackNumber}&title=${props.title}`}
    >
      <a>{props.title}</a>
    </Link>
  </li>
)

export default Et200sLink

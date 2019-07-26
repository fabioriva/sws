import Link from 'next/link'

const Et200mLink = (props) => (
  <li>
    <Link
      as={`/${props.aps}/rack/m/${props.rackNumber + 1}`}
      href={`/${props.aps}/plc/et200m?rackNumber=${props.rackNumber}&title=${props.title}`}
    >
      <a>{props.title}</a>
    </Link>
  </li>
)

export default Et200mLink

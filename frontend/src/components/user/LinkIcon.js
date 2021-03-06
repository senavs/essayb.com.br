export default function LinkIcon({ href, iconName }) {
  return (
    <a target="_blank" style={{ color: 'initial' }} href={href}>
      <i className={`fs-2 bi bi-${iconName}`}></i>
    </a>
  )
}
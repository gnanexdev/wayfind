export function Icon({ name }) {
  const icons = { arrow: '→', spark: '✦', location: '⌖', search: '⌕', compare: '◫', route: '↗' }
  return <span aria-hidden="true">{icons[name] || '✦'}</span>
}

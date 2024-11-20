interface Properties {
  children?: React.ReactNode
}

const Groups: React.FC<Properties> = ({ children }) => {
  return <div>{children}</div>
}

export default Groups

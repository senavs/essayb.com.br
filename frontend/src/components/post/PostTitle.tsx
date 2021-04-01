interface PostTitleProps {
  children: string
}

export default function PostTitle({ children }: PostTitleProps) {

  return (
    <div className="h1">
      {children}
    </div>
  )
}
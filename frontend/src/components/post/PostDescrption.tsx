interface PostDescriptionProps {
  children: string
}

export default function PostDescription({ children }: PostDescriptionProps) {

  return (
    <div className="h4 text-secondary text-justify">
      {children}
    </div>
  )
}
import { createContext, ReactElement, ReactNode, useState } from "react";


interface PostContextProps {
  children: ReactNode
}

interface PostContextValue {
  sections: Array<ReactElement>
  contents: Array<string>
  currentId: number
  addSection: (section: ReactElement) => void
  addContent: (id: number, content: string) => void
}

export const PostContext = createContext({
  sections: [],
  contents: [],
  currentId: 0,
  addSection: (section: ReactElement) => { },
  addContent: (id: number, content: string) => { }
} as PostContextValue)

export default function PostProvider({ children }: PostContextProps) {
  const [sections, setSections] = useState([])
  const [contents, setContents] = useState([])
  const [currentId, setCurruntId] = useState(0)

  function addSection(section: ReactElement) {
    setSections([
      ...sections,
      section
    ])
    addContent(currentId, null)
    setCurruntId(currentId + 1)
  }
  function addContent(id: number, content: string) {
    setContents(contents.filter((previousContent, index) => index === id ? content : previousContent))
  }

  return (
    <PostContext.Provider
      value={{
        sections,
        contents,
        currentId,
        addSection,
        addContent
      } as PostContextValue}
    >
      {children}
    </PostContext.Provider>
  )
}
import { createContext, ReactElement, ReactNode, useState } from "react";


interface PostContextProps {
  children: ReactNode
}

interface PostContextValue {
  sections: Array<ReactElement>
  contents: Array<string>
  currentId: number
  addSection: (section: ReactElement) => void
  removeSection: (id: number) => void,
  addContent: (id: number, content: string) => void
}

export const PostContext = createContext({
  sections: [],
  contents: [],
  currentId: 0,
  addSection: (section: ReactElement) => { },
  removeSection: (id: number) => { },
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
  function removeSection(id: number) {
    setSections(sections.filter((section, index) => index !== id ? section : null))
    setContents(contents.filter((content, index) => index !== id ? content : null))
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
        removeSection,
        addContent
      } as PostContextValue}
    >
      {children}
    </PostContext.Provider>
  )
}
import { useContext, useState } from "react";
import ReactMarkdown from "react-markdown"
import { PostContext } from "src/libs/contexts/post";
import styles from "src/styles/components/post/Section.module.css"


interface SectionProps {
  id: number
}

export default function Section({ id }: SectionProps) {
  const { addContent } = useContext(PostContext)
  const [rows, setRows] = useState(2)
  const [content, setContent] = useState('')
  const [isActivated, setIsActivated] = useState(true)

  function onKeyPress(event) {
    if (!event.shiftKey && event.key === 'Enter') {
      setIsActivated(false)
      event.target.blur()
      setIsActivated(false)
    }
  }
  function onClick(event) {
    setIsActivated(!isActivated)
  }
  function onChange(event) {
    setContent(event.target.value)
    addContent(id, event.target.value)
    setRows(content.split('\n').length + 1)
  }

  return (
    <div className="container">
      <div className="row">
        <div className={`${styles.buttons} col-2 text-end`}>
          <a className='btn btn-sm btn-outline-secondary' onClick={onClick}>
            {isActivated
              ? <i className="bi bi-check2"></i>
              : <i className="bi bi-pencil"></i>
            }
          </a>
        </div>
        <div className={`${styles.inputs} col-10 d-flex`}>
          {isActivated
            ? <textarea className="w-100" maxLength={128} rows={rows} onKeyPress={onKeyPress} onChange={onChange} value={content} disabled={!isActivated} />
            : <ReactMarkdown children={content} ></ReactMarkdown>
          }
        </div>
      </div>
    </div>
  )
}
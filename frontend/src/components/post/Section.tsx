import { useContext, useRef, useState } from "react";
import ReactMarkdown from "react-markdown"
import { PostContext } from "src/libs/contexts/post";
import styles from "src/styles/components/post/Section.module.css"


interface SectionProps {
  id: number
}

export default function Section({ id }: SectionProps) {
  const { currentId, addContent, addSection, removeSection } = useContext(PostContext)
  const [rows, setRows] = useState(2)
  const [content, setContent] = useState('')
  const [isInputActivated, setIsInputActivated] = useState(true)

  function onKeyPress(event) {
    if (!event.shiftKey && event.key === 'Enter') {
      setIsInputActivated(false)
      event.target.blur()

      addSection(<Section key={currentId} id={currentId} />)
    }
  }
  function onClickCheck() {
    setIsInputActivated(!isInputActivated)
  }
  function onClickRemove() {
    removeSection(id)
  }
  function onDoubleClick() {
    setIsInputActivated(true)
  }
  function onBlur() {
    setIsInputActivated(false)
  }
  function onChange(event) {
    setContent(event.target.value)
    addContent(id, event.target.value)
    setRows(content.split('\n').length + 1)
  }

  return (
    <div className="container mb-3">
      <div className="row">
        <div className="col-2 text-end">
          {isInputActivated
            ? < a className='btn btn-sm btn-outline-success ms-2' onClick={onClickCheck}>
              <i className="bi bi-check2"></i>
            </a>
            : < a className='btn btn-sm btn-outline-secondary ms-2' onClick={onClickCheck}>
              <i className="bi bi-pencil"></i>
            </a>
          }
          <a className='btn btn-sm btn-outline-danger ms-2' onClick={onClickRemove}>
            <i className="bi bi-x"></i>
          </a>
        </div>

        <div className={`${styles.inputs} col-10 d-flex`}>
          {isInputActivated
            ? <textarea
              className="w-100"
              maxLength={128}
              rows={rows}
              onKeyPress={onKeyPress}
              onChange={onChange}
              value={content}
              disabled={!isInputActivated}
              placeholder={"Text ..."}
              onBlur={onBlur}
            />
            : <span onDoubleClick={onDoubleClick}>
              <ReactMarkdown children={content} />
            </span>
          }
        </div>
      </div>
    </div >
  )
}
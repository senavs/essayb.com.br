import { useContext, useEffect } from "react";
import { PostContext } from "src/libs/contexts/post";
import Section from "src/components/post/Section"


export default function PostSections() {
  const { sections, currentId, addSection } = useContext(PostContext)

  useEffect(() => {
    addSection(<Section key={currentId} id={currentId} />)
  }, [])

  function onClick(event) {
    addSection(<Section key={currentId} id={currentId} />)
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          {sections.map(e => e)}
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center ">
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClick}>
            <i className="bi bi-plus"></i>
          </button>
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClick}>
            <i className="bi bi-camera"></i>
          </button>
        </div>
      </div>
    </>
  )
}
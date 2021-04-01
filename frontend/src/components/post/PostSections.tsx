import { useContext, useEffect } from "react";

import Section from "../../components/post/Section"
import { PostContext } from "../../libs/contexts/post";
import { fileToBase64 } from "../../libs/utils/form";


export default function PostSections() {
  const { sections, currentId, addSection } = useContext(PostContext)

  useEffect(() => {
    addSection(<Section key={currentId} id={currentId} />)
  }, [])

  function onClickNewText() {
    addSection(<Section key={currentId} id={currentId} />)
  }
  function onClickNewImage() {
    document.getElementById('upload_image').click()
  }
  function onFileUpload(event) {
    fileToBase64(event.target.files[0], base64 => {
      addSection(<Section key={currentId} id={currentId} image={base64} isBase64={true} />)
    })
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
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClickNewText}>
            <i className="bi bi-plus"></i>
          </button>
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClickNewImage}>
            <i className="bi bi-camera"></i>
          </button>
          <input id="upload_image" className="d-none" type="file" onChange={onFileUpload} />
        </div>
      </div>
    </>
  )
}
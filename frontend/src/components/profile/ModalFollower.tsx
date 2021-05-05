import Avatar from "./Avatar"
import FollowService from "../../libs/services/follow"
import { useState, useEffect } from "react"

interface FollowProfileModalProps {
  username: string
}

export default function ModalFollower({ username }: FollowProfileModalProps) {

  const [skip, setSkip] = useState(7)
  const [follow, setFollow] = useState([])

  useEffect(() => {
    FollowService.list_follower(username, 0, 7)
      .then(setFollow).catch()
  }, [])



  function onClickLoadMore(event) {
    FollowService.list_follower(username, skip, 7)
      .then((res) => {
        if (res.length < 7) {
          event.target.hidden = true
        }
        setSkip(skip + 7)
        setFollow(follow.concat(res))
      })
  }


  return (
    <div className="modal fade" id="followers" tabIndex={-1} aria-labelledby="modalFollowerHeader" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalFollowHeader">Followers</h5>
          </div>
          <div className="modal-body">
            <div className="container">


              {follow.length === 0 && (
                <div className="d-flex justify-content-center">
                  <span className="fs-2">No one follow you</span>
                </div>
              )}


              {follow.map((e, i) => {
                return (<div style={{ padding: "0.65rem" }} key={i}>
                  <Avatar username={e.follower.username} useProfileUrl={true} width="2rem" />
                  <div style={{ display: "inline", padding: "0.65rem" }}> {e.follower.username}</div>
                </div>)
              })}


              {/* button loadmore */}
              {follow.length >= 7 && (

                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-secondary" onClick={onClickLoadMore}>Load more</button>
                </div>
              )}

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
import Avatar from "./Avatar"
import FollowService from "../../libs/services/follow"
import { useState, useEffect } from "react"

interface FollowProfileModalProps {
  username: string
}

export default function ModalFollowing({username }: FollowProfileModalProps) {

  const [skip, setSkip] = useState(10)
  const [follow, setFollow] = useState([])

  useEffect(() => {
    FollowService.list_following(username)
      .then(setFollow).catch()
  }, [])



  function onClickLoadMore(event) {
    FollowService.list_following(username, skip)
      .then((res) => {
        if (res.length < 10) {
          event.target.hidden = true
        }
        setSkip(skip + 10)
        setFollow(follow.concat(res))
      })
  }


  return (
    <div className="modal fade" id="followings" tabIndex={-1} aria-labelledby="modalFollowingHeader" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalFollowHeader">Followings</h5>
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
                  <Avatar username={e.following.username} useProfileUrl={true} width="2rem" />
                  <div style={{ display: "inline", padding: "0.65rem" }}> {e.following.username}</div>
                </div>)
              })}


              {/* button loadmore */}
              {follow.length >= 10 && (

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
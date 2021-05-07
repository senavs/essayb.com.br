import { useState, useEffect } from "react"

import FollowService, { FollowListInterface } from "../../libs/services/follow"
import UserCard from "./UserCard"


type modalType = 'followers' | 'followings'

interface ModalFollowsProps {
  username: string
  modalType: modalType
}


export default function ModalFollows({ username, modalType }: ModalFollowsProps) {
  const [skip, setSkip] = useState(5)
  const [follows, setFollows] = useState([] as FollowListInterface)
  const serviceListFunction = modalType == 'followers' ? FollowService.list_follower : FollowService.list_following

  useEffect(() => {
    serviceListFunction(username, 0, 5)
      .then(setFollows).catch()
  }, [])

  function onClickLoadMore(event) {
    serviceListFunction(username, skip, 5)
      .then((res) => {
        if (res.length < 5) {
          event.target.hidden = true
        }
        setSkip(skip + 5)
        setFollows(follows.concat(res))
      })
  }

  return (
    <div className="modal fade" id={modalType} tabIndex={-1} aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="modalFollowHeader">User {`${modalType}`}</h5>
          </div>

          <div className="modal-body">
            {/* no followers/followings */}
            {follows.length === 0 && (
              <div className="d-flex justify-content-center">
                <i className="fs-2 bi bi-emoji-frown mx-2"></i>
                <span className="fs-2">No {modalType}</span>
              </div>
            )}

            {/* followers/followings list */}
            {follows.map((e, i) => {
              return (<div className="mb-1" key={i}>
                <UserCard username={modalType == 'followers' ? e.follower.username : e.following.username} />
              </div>)
            })}

            {/* button loadmore */}
            {follows.length >= 5 && (
              <div className="d-flex justify-content-center">
                <button className="btn btn-outline-secondary" onClick={onClickLoadMore}>Load more</button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
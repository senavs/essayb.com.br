import { useParams } from 'react-router-dom'


export default function Profile() {
  // states
  const { username } = useParams()

  // render
  return (
    <div className="container">
      <h1>Profile page</h1>
      <h4>{username && `Username: ${username}`}</h4>
    </div>
  )
}
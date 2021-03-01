import { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import AuthService from '../../../services/Auth'


export default function Login() {
  // context
  const { auth, setAuth } = useContext(AuthContext)

  // states
  const history = useHistory()
  const [formValue, setFormValue] = useState({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  // functions
  const handlerForm = (event) => {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handlerSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')

    // call api to login user
    AuthService.login(formValue.username, formValue.password)
      .then((res) => {
        setAuth(res)
        history.push('/')
      })
      .catch((err) => setErrorMessage(err.message))
  }

  // render
  if (auth.token) {
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-4 col-md-4 col-12">
          <div className="col">
            <h1 className="mb-4 fst-italic border-bottom">Login</h1>
          </div>
          <div className="container mb-3 border rounded p-3 shadow-sm">
            <form onSubmit={handlerSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" maxLength="32" className="form-control" name="username" value={formValue.username} onChange={handlerForm} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formValue.password} onChange={handlerForm} required />
              </div>
              <small className="d-block mb-3 text-danger">{errorMessage}</small>
              <button type="submit" className="btn btn-primary" >Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
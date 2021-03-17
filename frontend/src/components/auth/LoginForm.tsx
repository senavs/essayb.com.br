import { useContext, useState } from "react"
import { AuthContext } from "src/libs/contexts/auth"

interface FormValue {
  username: string,
  password: string
}

export default function LoginForm() {
  const { login } = useContext(AuthContext)
  const [formValue, setFormValue] = useState({ username: '', password: '' } as FormValue)
  const [errorMessage, setErrorMessage] = useState('')

  function onChange(event) {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  function onSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    login(formValue.username, formValue.password, () => { }, err => setErrorMessage(err.body.message))
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Username</label>
        <input
          name='username'
          type='text'
          className='form-control'
          placeholder='Enter your username. Eg: essayb'
          maxLength={32}
          value={formValue.username}
          onChange={onChange}
          required
        />
      </div>

      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input
          name='password'
          type='password'
          className='form-control'
          placeholder='Enter your password'
          value={formValue.password}
          onChange={onChange}
          required
        />
      </div>

      <small className='d-block mb-3 text-danger'>{errorMessage}</small>
      <button type='submit' className='btn btn-primary' >Login</button>

    </form>
  )
}
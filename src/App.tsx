import React, { useState } from 'react';
import axios from "axios"

const App: React.FC = () => {
  type User = {
    id: number
    login: string
    password: string
    delete: boolean
  }
  const initialState: User[] = []
  const [state, setState] = useState(initialState)

  type LoginState = {
    email: string,
    password: string
  }
  const [loginState, setLoginState] = useState<LoginState>({ email: "", password: "" })

  const fetchUsers = async () => {
    const users = await axios.get<User[]>("/api/read").catch(err => console.log(err))
    if (users) {
      setState(users.data)
    }
  }
  const addUser = async () => {
    let params = new URLSearchParams()
    params.append("email", loginState.email)
    params.append("password", loginState.password)
    await axios.post("/api/create/", params).then(res => { console.log(res) }).catch(err => console.log(err))
  }
  const mapUsers = () => {
    const userList = state.map(user => {
      return (
        <div>
          {user.id}
          <br />
          {user.login}
        </div>
      )
    })
    return userList
  }
  return (
    <div className="App">
      <input type="text"
        onChange={(e) => {
          setLoginState({ ...loginState, email: e.target.value })
        }}
      />
      <input type="password" name="" id=""
        onChange={(e) => {
          setLoginState({ ...loginState, password: e.target.value })
        }}
      />
      <button onClick={_ => addUser()}>登録</button>
      <button onClick={_ => fetchUsers()}>fetch</button>
      {mapUsers()}
    </div>
  );
}

export default App;

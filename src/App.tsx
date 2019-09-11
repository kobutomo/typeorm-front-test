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
  const fetchUsers = async () => {
    const users = await axios.get<User[]>("/api/read").catch(err => console.log(err))
    if (users) {
      setState(users.data)
    }
  }
  const addUser = async () => {
    await axios.get("/api/").catch(err => console.log(err))
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
      <input type="text" />
      <input type="password" name="" id="" />
      <button onClick={_ => fetchUsers()}>ボタン</button>
      <button onClick={_ => addUser()}>ボタン2</button>
      {mapUsers()}
    </div>
  );
}

export default App;

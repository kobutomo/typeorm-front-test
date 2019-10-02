import React, { useState, useEffect } from 'react';
import axios from "axios"

const App: React.FC = () => {
  type User = {
    id: number
    login: string
    password: string
    delete: boolean
  }

  type Post = {
    title: string;
    content: string;
    images: string[];
    rating: number;
    tags: string[];
    location: string;
    location_search: string;
    createdAt?: Date
    updatedAt?: Date
    delete: boolean
  }
  const initialState: Post[] = []
  const [state, setState] = useState(initialState)

  type LoginState = {
    email: string,
    password: string
  }
  const [loginState, setLoginState] = useState<LoginState>({ email: "", password: "" })

  const login = async () => {
    const result = await axios.post("/api/login", { email: loginState.email, password: loginState.password })
    console.log(result.data)
    localStorage.setItem("token", result.data.token)
  }
  const addUser = async () => {
    let params = new URLSearchParams()
    params.append("email", loginState.email)
    params.append("password", loginState.password)
    await axios.post("/api/create/", params).then(res => { console.log(res.data) }).catch(err => console.log(err))
  }
  const post = async () => {
    const detail = {
      title: "投稿" + (Math.random() * 10).toString().slice(0, 1),
      content: "説明説明",
      images: [""],
      rating: 3,
      tags: [""],
      location: "大阪",
      locationSearch: "梅田"
    }
    const resuponse = await axios.post("/api/post/", detail, { headers: { "x-access-token": localStorage.token } })
    console.log(resuponse.data)
    mapUsers()
  }
  
  useEffect(() => {
  },[])
  
  const del = async () => {
    await axios.get("/api/delete/", { headers: { "x-access-token": localStorage.token } })
    mapUsers()
  }
  const mapUsers = async () => {
    const posts = await axios.get<Post[]>("/api/post/")
    console.log(posts.data)
    setState(posts.data)
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
      <button onClick={_ => login()}>ログイン</button>
      <button onClick={_ => post()}>投稿</button>
      <button onClick={_ => del()}>削除</button>
      {state.map((post, i) => <div key={i}><p>{post.title}</p><p>{post.content}</p><p>{post.delete ? "true" : "false"}</p></div>)}
    </div>
  );
}

export default App;

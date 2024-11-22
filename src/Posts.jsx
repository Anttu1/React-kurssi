import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

  //Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
 fetch ("https://jsonplaceholder.typicode.com/posts")
 .then(res => res.json()) //muutetaan json data javascriptiksi
 .then(oliot => setPosts(oliot))
}
,
[]
)

  return (
    <div className='posts'>
      <br></br>
      <h4>
        <button onClick={() => setShowPosts(!showPosts)}>Postaukset</button>
        </h4>
        {
            showPosts && posts && posts.map(p => 
                <>
                <div className='card' key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                </div>
                </>
            )
        }
    </div>
  )
}
export default Posts
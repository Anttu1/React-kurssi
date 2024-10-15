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
        <button onClick={() => setShowPosts(!showPosts)}>Postaukset</button>

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
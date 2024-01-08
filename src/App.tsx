import { useEffect } from 'react'
import './App.css'
import { useGetAllCommentMutation } from './store/api'

function App() {
  const [getAllComment, comment] = useGetAllCommentMutation()

  useEffect(() => {
    getAllComment()
  }, [])

  console.log(comment)
  return (
    <div>
      <p>testing</p>
    </div>
  )
}

export default App

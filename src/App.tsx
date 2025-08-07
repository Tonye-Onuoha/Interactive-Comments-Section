import { useState } from 'react'
import UpvoteButton from './components/UpvoteButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UpvoteButton/>
  )
}

export default App

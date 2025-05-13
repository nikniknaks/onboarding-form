import { useState } from 'react'
import { Button, Heading } from '@primer/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Heading>Onboarding Form</Heading>
      <Button>Submit</Button>
     
    </>
  )
}

export default App

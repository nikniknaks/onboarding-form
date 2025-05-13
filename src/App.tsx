import { useState } from 'react'
import { Button, Heading, FormControl, TextInput, Box, PageLayout } from '@primer/react'
import { useForm, SubmitHandler } from "react-hook-form"
import React from 'react'

type Inputs = {
  example: string
  exampleRequired: string
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const [count, setCount] = useState(0)
  // const handleSubmit = () => {
  //   console.log('Form submitted')

  // }

  return (
    <>
      <PageLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
        <PageLayout.Header>Onboarding Form</PageLayout.Header>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <TextInput size='large'/>
            <FormControl.Validation variant="error">Invalid First Name. Max 50 Alphanumeric Characters</FormControl.Validation>
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <TextInput size='large' />
            <FormControl.Validation variant="error">Invalid Last Name. Max 50 Alphanumeric Characters</FormControl.Validation>
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <TextInput size='large' />
            <FormControl.Validation variant="error">Invalid Phone Number. Valid Canadian Phone Number Required</FormControl.Validation>
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>Corporation Number</FormControl.Label>
            <TextInput size='large' />
            <FormControl.Validation variant="error">Invalid Corporation Number. Does Not Exist</FormControl.Validation>
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Footer>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </PageLayout.Footer>
        </form>
      </PageLayout>
    </>
  )
}

export default App

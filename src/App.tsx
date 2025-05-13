import { useState } from 'react'
import { Button, Heading, FormControl, TextInput, Box, PageLayout } from '@primer/react'
import { useForm, SubmitHandler } from "react-hook-form"
import React from 'react'
import { error } from 'console'

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const onBlurValidateFormField = (value) => {
    console.log('Validating Corporation Number: ', value)
    if (value && value.length < 5) {
      console.log('Corporation Number Invalid')
      return false
    } else {
      return true
    }
  }

  const [count, setCount] = useState(0)
  // const handleSubmit = () => {
  //   console.log('Form submitted')

  // }

  return (
    <>
    <Box  sx={{
    backgroundColor: 'var(--bgColor-inset)',
    borderRadius: 'var(--borderRadius-medium)',
    padding: 'var(--stack-padding-spacious)',
    fontFamily: 'var(--fontStack-sansSerif)',
  }}>
      <PageLayout padding='normal' rowGap='normal'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <PageLayout.Header>Onboarding Form</PageLayout.Header>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <TextInput size='large' {...register("firstName", { required: true, maxLength: 50, pattern: /^[A-Za-z]+$/i })} />
            { errors.firstName && <FormControl.Validation variant="error">Invalid First Name. Max 50 Alphanumeric Characters</FormControl.Validation>}
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <TextInput size='large' {...register("lastName", { required: true, maxLength: 50, pattern: /^[A-Za-z]+$/i })}/>
            { errors.lastName && <FormControl.Validation variant="error">Invalid Last Name. Max 50 Alphanumeric Characters</FormControl.Validation> }
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Content>
          
        </PageLayout.Content>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <TextInput size='large' {...register("phone", { required: true, pattern: /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/i })}/>
            { errors.phone && <FormControl.Validation variant="error">Invalid Phone Number. Valid Canadian Phone Number Required</FormControl.Validation> }
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Content>
          <FormControl>
            <FormControl.Label>Corporation Number</FormControl.Label>
            <TextInput
              size='large'
              {
                ...register(
                  "corporationNumber",
                  {
                    required: true,
                    validate: { onBlurValidateFormField }
                  }
                )
              }
            />
            { errors.corporationNumber && <FormControl.Validation variant="error">Invalid Corporation Number. Max 50 Alphanumeric Characters</FormControl.Validation> }
          </FormControl>
        </PageLayout.Content>
        <PageLayout.Footer>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </PageLayout.Footer>
        </form>
      </PageLayout>
      </Box>
    </>
  )
}

export default App

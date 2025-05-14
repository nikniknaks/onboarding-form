import { useForm, SubmitHandler } from "react-hook-form"
import React from 'react'
import { validateCorporationNumber } from './infrastructure/validateCorporationNumber'
import { FormTextInput } from "./components/FormInput";

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
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const onBlurValidateFormField = (value) => {
    if (!value) {
      return false;
    }

    return validateCorporationNumber(value).then((response) => {
      return response.valid;
    }).catch(() => {
      return false;
    });
  }

  return (
    <>
    <div className='subpixel-antialiased justify-center bg-neutral-50 flex h-screen'>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className={'w-lg rounded-xl bg-white border-2 border-gray-100 border-r-8 px-6 flex flex-col h-fit mt-6'}
        >

        <div>
          <h1 className="text-center text-2xl my-4">Onboarding Form</h1>
        </div>

        <div className="flex justify-between">

          <div className="flex flex-col w-47 mb-4 ">
            <FormTextInput
                name="firstName"
                label="First Name"  
                errors={errors}
                validationMessage={"Invalid first name. Max 50 alphanumeric characters"}
                register={register}
                registerOptions={{
                  required: true,
                  maxLength: 50,
                  pattern: /^[A-Za-z]+$/i
                }}
            />
          </div>

          <div className="flex flex-col w-60 mb-4 ">
            <FormTextInput
              name="lastName"
              label="Last Name"  
              errors={errors}
              validationMessage={"Invalid last name. Max 50 alphanumeric characters"}
              register={register}
              registerOptions={{
                required: true,
                maxLength: 50,
                pattern: /^[A-Za-z]+$/i
              }}
            />
          </div>
        </div>

        <div  className="flex flex-col mb-4">
          <FormTextInput
            name="phone"
            label="Phone Number"  
            errors={errors}
            validationMessage={"Invalid phone number. Valid Canadian phone number required"}
            register={register}
            registerOptions={{
              required: true,
              maxLength: 50,
              pattern: /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/i
            }}
          />
        </div>
        
        <div className="flex flex-col mb-4">
          <FormTextInput
            name="corporationNumber"
            label="Corporation Number"
            errors={errors}
            validationMessage={"Invalid corporation number"}
            register={register}
            registerOptions={{
              required: true,
              maxLength: 9,
              validate: { onBlurValidateFormField }
            }}
          />
        </div>

        <button className="bg-black rounded-lg text-gray-100 text-sm leading-[3] mt-2 mb-6"  type='submit'>Submit {'\u27A2'}</button>
      </form>
    </div>
    </>
  )
}

export default App

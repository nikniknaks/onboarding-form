import { useForm, SubmitHandler } from "react-hook-form"
import { validateCorporationNumber } from './infrastructure/validateCorporationNumber'
import { FormTextInput } from "./components/FormInput";
import { validateCorporationDetails } from "./infrastructure/validateCorporationDetails";
import { useState } from "react";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

function App() {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    validateCorporationDetails(data).then((response) => {
      if (response.valid) {
        setErrorMessage(null);
      } else {
        setErrorMessage(response.message);
      }
    }).catch((error) => {
      console.error("Error during validation", error);
    });
  }

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

  const registerFirstName = {...register("firstName", { required: true, maxLength: 50, pattern: /^[A-Za-z]+$/i })}
  const registerLastName = {...register("lastName", { required: true, maxLength: 50, pattern: /^[A-Za-z]+$/i })}
  const registerPhone = {...register("phone", { required: true, pattern: /^\+1[-.\s]?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}$/i })}
  const registerCorporationNumber = {
    ...register(
      "corporationNumber",
      {
        required: true,
        validate: { onBlurValidateFormField }
      }
    )
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
                register={registerFirstName}
            />
          </div>

          <div className="flex flex-col w-60 mb-4 ">
            <FormTextInput
              name="lastName"
              label="Last Name"  
              errors={errors}
              validationMessage={"Invalid last name. Max 50 alphanumeric characters"}
              register={registerLastName}
            />
          </div>
        </div>

        <div  className="flex flex-col mb-4">
          <FormTextInput
            name="phone"
            label="Phone Number"  
            errors={errors}
            validationMessage={"Invalid phone number. Valid Canadian phone number required"} 
            register={registerPhone}
          />
        </div>
        
        <div className="flex flex-col mb-4">
          <FormTextInput
            name="corporationNumber"
            label="Corporation Number"
            errors={errors}
            validationMessage={"Invalid corporation number"}
            register={registerCorporationNumber}
          />
        </div>

        <button className="bg-black rounded-lg text-gray-100 text-sm leading-[3] mt-2 mb-2" type='submit'>Submit {'\u27A2'}</button>
        <span className="text-red-500 text-xs pt-2 mb-4">{errorMessage}</span>
      </form>
    </div>
    </>
  )
}

export default App

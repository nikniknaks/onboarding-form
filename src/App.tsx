import { useForm, SubmitHandler } from "react-hook-form"
import React from 'react'
import { validateCorporationNumber } from './infrastructure/validateCorporationNumber'

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
    <div className={'bg-neutral-300'} style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
        <form onSubmit={handleSubmit(onSubmit)} style={
          { width: '50%', display: 'flex', flexDirection: 'column', 
            gap: '1rem', backgroundColor: 'white', borderRadius: '8px', borderStyle: 'solid', borderWidth: '2px', borderColor: '#EFEFEF', padding: '2rem',
            margin: '2rem'}
        }>
        <div style={{display:"flex", justifyContent: 'center'}}>
          <h1 style={{margin: '0px'}}>Onboarding Form</h1>
        </div>
            <label>First Name</label>
            <input type="text" {...register("firstName", { required: true, maxLength: 50, pattern: /^[A-Za-z]+$/i })} />
            { errors.firstName && <span>Invalid First Name. Max 50 Alphanumeric Characters</span>}
         
            <label>Last Name</label>
            <input type="text" {...register("lastName", { required: true, maxLength: 50, pattern: /^[A-Za-z]+$/i })}/>
            { errors.lastName && <span>Invalid Last Name. Max 50 Alphanumeric Characters</span> }
          
            <label>Phone Number</label>
            <input type="text" {...register("phone", { required: true, pattern: /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/i })}/>
            { errors.phone && <span>Invalid Phone Number. Valid Canadian Phone Number Required</span> }
          
            <label>Corporation Number</label>
            <input
              type="text"
           
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
            { errors.corporationNumber && <span>Invalid Corporation Number. Max 50 Alphanumeric Characters</span> }
          <button type='submit' style={{backgroundColor: 'black'}}>Submit</button>
        </form>
        </div>
    </>
  )
}

export default App

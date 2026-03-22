import React from 'react'

function SignUp() {
  return (
    <>
        <div className='w-screen h-screen bg-amber-50 flex justify-center items-center'>
            <form>
                <div>
                    <label htmlFor="firstName">FirstName: </label>
                    <input type="text" id='firstName'
                        placeholder='enter your first name'
                    />
                </div>

                <div>
                    <label htmlFor="lastName">LastName: </label>
                    <input type="text" id='lastName'
                        placeholder='enter your last name'
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id='email'
                        placeholder='enter your email'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id='password'
                        placeholder='create your password'
                    />
                </div>
                <div>
                    <label htmlFor="mobileNo">Mobile No. : </label>
                    <input type="string" id='mobileNo'
                        max={10}
                        placeholder='enter your mobile No.'
                    />
                </div>


            </form>    
        </div> 
    </>
  )
}

export default SignUp

import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <p className='w-fit rounded-lg bg-black p-4 text-white shadow-md'>To bypass the sign-up process, you may use the following email and password to log in.</p>
            <div className='ml-14 w-fit rounded-lg bg-primary-500 p-4 shadow-md'>
                <p className='text-lg text-white'>Email: userofprojectdemo@gmail.com</p>
                <p className='text-white text-lg'>Password: Testproject123=</p>
            </div>
            <SignIn/>
        </>
    );
}

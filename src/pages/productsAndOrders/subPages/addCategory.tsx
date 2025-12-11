import { Form, Formik } from "formik"
import { FormInput } from "../../../common/FormInput"
import { useState } from "react"
import { addCategoryInitialValues } from "../../../constants/initialValues"
import { addCategoryValidationSchema } from "../../../constants/validationSchema"


export default function AddCategory(){
    const [formData , setFormData] = useState({
        category : '',
        englishName : '',
        active : 'Yes' ,
    })

    console.log(formData)

    return(
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <h1 className="text-[20px] font-bold mb-8">Add Category</h1>
            <Formik
                initialValues={addCategoryInitialValues}
                validationSchema={addCategoryValidationSchema}
                onSubmit={(values) => {
                    setFormData({...formData , ...values})
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className=" grid grid-cols-1 gap-5 pb-10">
                            <div className="grid grid-cols-2">
                                <div className="grid grid-cols-2 gap-5">
                                    <FormInput
                                        name="englishName"
                                        label="English Name"
                                        placeholder="English Name"
                                        type="text"
                                    />
                                    <FormInput
                                        name="arabicName"
                                        label="Arabic Name"
                                        placeholder="Arabic Name"
                                        type="text"
                                    />
                                    <div className=" h-[76px] space-y-2">
                                        <h2 className="text-[14px] m-0 text-gray-700">Active</h2>
                                        <div className=" grid grid-cols-2 gap-5">
                                            {['Yes' , 'No'].map((btn) => {
                                                return(
                                                    <button onClick={() => {
                                                        setFormData({...formData , active : btn})
                                                    }} key={btn} type="button" className={`rounded-xl mt-2 border ${formData.active === btn ? 'border-[#FFC107] bg-[#FFF4D3] hover:bg-[#ffefb9]' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}  px-4 h-12 text-sm font-medium transition-all duration-200 text-[14px]`}>{btn}</button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 mb-10">
                            <button disabled={!isValid} type="submit" className="h-12 text-[20px] font-bold bg-[#FFC107] rounded-[10px]">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}
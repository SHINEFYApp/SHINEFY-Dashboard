import { Form, Formik } from "formik";
import { TextArea } from "../../../common/textArea";
import { AddFqsValidationSchema } from "../../../constants/validationSchema";

export default function AddFqs(){

    return(
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                <Formik
                    initialValues={{
                        englishQuestion: '' ,
                        arabicQuestion : '' ,
                        englishAnswar: '' ,
                        arabicAnswar : '' ,
                    }}
                    validationSchema={AddFqsValidationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({isValid}) => (
                        <Form>
                            <div className=" flex flex-wrap space-y-5 justify-between">
                                    <TextArea
                                        name="englishQuestion"
                                        label="English Question"
                                        placeholder="English Question"
                                        className="h-[200px] w-[49%]"
                                    />
                                    <TextArea
                                        name="englishAnswar"
                                        label="English Answar"
                                        placeholder="English Answar"
                                        className="h-[200px] w-[49%]"
                                    />
                                    <TextArea
                                        name="arabicQuestion"
                                        label="Arabic Question"
                                        placeholder="Arabic Question"
                                        className="h-[200px] w-[49%]"
                                    />
                                    <TextArea
                                        name="arabicAnswar"
                                        label="Arabic Answar"
                                        placeholder="Arabic Answar"
                                        className="h-[200px] w-[49%]"
                                    />
                            </div>

                            <button disabled={!isValid} type="submit" className="w-[376px] mt-30 font-bold text-[20px] rounded-xl bg-[#FFC107] py-3">
                                Save
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>
        </main>
    )
}
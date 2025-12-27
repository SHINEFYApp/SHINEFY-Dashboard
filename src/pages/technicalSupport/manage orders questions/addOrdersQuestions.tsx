import { Form, Formik } from "formik";
import { TextArea } from "../../../common/textArea";
import { AddOrdersQuestionsSchema } from "../../../constants/validationSchema";

export default function AddOrdersQuestions() {


    return(
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                <Formik
                    initialValues={{
                        questionEnglish : '' ,
                        questionArabic : ''
                    }}
                    validationSchema={AddOrdersQuestionsSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >   
                    {({isValid}) => (
                        <Form>
                            <div className="flex justify-between">
                                <TextArea
                                    name="questionEnglish"
                                    label="Question (English)"
                                    placeholder="Enter Message"
                                    className="h-[200px] w-[49%]"
                                />
                                <TextArea
                                    name="questionArabic"
                                    label="Question Arabic"
                                    placeholder="Enter Message"
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
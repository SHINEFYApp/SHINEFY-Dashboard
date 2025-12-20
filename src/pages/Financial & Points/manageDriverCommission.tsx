import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { manageDriverCommissionSchema } from "../../constants/validationSchema";

export default function ManageDriverCommission() {
    return (
        <main className="w-full bg-white flex justify-center items-center shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-[90vh]">
            <Formik
                initialValues={{
                    service : '',
                    extraService : '',
                }}
                validationSchema={manageDriverCommissionSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({}) => (
                    <Form>
                        <div className="w-[376px]">
                            <FormInput
                                name="service"
                                label="Service(in %)"
                                placeholder="Service(in %)"
                                type="text"
                            />
                            <FormInput
                                name="extraService"
                                label="Extra Service(in %)"
                                placeholder="Extra Service(in %)"
                                type="text"
                                className="mt-5"
                            />
                            <button
                                type="submit"
                                className="py-3 bg-[#FFC107] w-full rounded-[10px] font-bold mt-5"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
}

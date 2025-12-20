import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { manageVatSchema } from "../../constants/validationSchema";

export default function ManageVat() {
    return (
        <main className="w-full bg-white flex justify-center items-center shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-[90vh]">
            <Formik
                initialValues={{ vat: "" }}
                validationSchema={manageVatSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({}) => (
                    <Form>
                        <div className="w-[376px]">
                            <FormInput
                                name="vat"
                                label="Manage VAT (%)"
                                placeholder="Manage VAT (%)"
                                type="text"
                            />
                            <button
                                type="submit"
                                className="py-3 bg-[#FFC107] w-full rounded-[10px] font-bold mt-5"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
}

import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { manageBounusPointsSchema } from "../../constants/validationSchema";
import { FormDropdown } from "../../common/FormDropdown";

export default function ManageBonusPoint() {
    return (
        <main className="w-full bg-white flex justify-center items-center shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-[90vh]">
            <Formik
                initialValues={{
                    bounusPoints : '',
                    bonusPercentage : '',
                }}
                validationSchema={manageBounusPointsSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({}) => (
                    <Form>
                        <div className="w-[376px]">
                            <FormDropdown
                                name="bounusPoints"
                                label="Select bonus point Status :"
                                placeholder="Select bonus point Status"
                                options={[
                                    'On',
                                    'Off',
                                ]}
                            />
                            <FormInput
                                name="bonusPercentage"
                                label="Bonus Percentage :"
                                placeholder="Bonus Percentage"
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

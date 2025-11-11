import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../../ui/button';
import type { ServicesStep4Props } from '../../../../../types/bookings';

const ServicesStep4 = ({ onBack, onSubmit, formData, onDataChange }: ServicesStep4Props) => {

    const validationSchema = Yup.object({
        userNote: Yup.string(),
        adminNotes: Yup.string(),
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-scale-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={{
                    userNote: formData.userNote || '',
                    adminNotes: formData.adminNotes || '',
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    onDataChange(values);
                    onSubmit();
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {/* User Note */}
                        <div className="mb-8">
                            <label className="text-base font-bold text-gray-900 mb-3 block">
                                User Note
                            </label>
                            <textarea
                                name="userNote"
                                value={values.userNote}
                                onChange={(e) => {
                                    setFieldValue('userNote', e.target.value);
                                    onDataChange({ userNote: e.target.value });
                                }}
                                placeholder="Enter Note"
                                rows={6}
                                className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            />
                        </div>

                        {/* Admin Notes */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-base font-bold text-gray-900">
                                    Admin Notes
                                </label>
                            </div>

                            <textarea
                                name="adminNotes"
                                value={values.adminNotes}
                                onChange={(e) => {
                                    setFieldValue('adminNotes', e.target.value);
                                    onDataChange({ adminNotes: e.target.value });
                                }}
                                placeholder="Enter Note"
                                rows={8}
                                className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 md:flex-none md:px-16 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200"
                            >
                                Back
                            </button>
                            <Button
                                type="submit"
                                className="flex-1 md:flex-none bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ServicesStep4;

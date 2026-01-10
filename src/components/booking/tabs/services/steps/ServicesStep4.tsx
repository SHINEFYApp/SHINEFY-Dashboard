import { Formik, Form } from 'formik';
import { servicesStep4Schema } from '../../../../../constants/validationSchema';
import { Button } from '../../../../ui/button';
import type { stepsProps } from '../../../../../types/bookings';

const ServicesStep4 = ({ 
    onBack, 
    onSubmit, 
    formData ,
    setFormData
}: stepsProps) => {

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={{
                    userNote: formData.userNote || '',
                    adminNotes: formData.adminNotes || '',
                }}
                validationSchema={servicesStep4Schema}
                enableReinitialize
                onSubmit={() => {
                    console.log(formData)
                    onSubmit();
                }}
            >
                {({ }) => (
                    <Form>
                        {/* User Note */}
                        <div className="mb-8">
                            <label className="text-base font-bold text-gray-900 mb-3 block">
                                User Note
                            </label>
                            <textarea
                                name="userNote"
                                value={formData.userNote}
                                onChange={(e) => {
                                    setFormData({...formData , userNote: e.target.value });
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
                                value={formData.adminNotes}
                                onChange={(e) => {
                                    setFormData({...formData , adminNotes: e.target.value });
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
        </>
    );
};

export default ServicesStep4;

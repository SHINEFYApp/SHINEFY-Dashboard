import { Formik, Form } from "formik";
import { ArrowLeft, X } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormTimePicker } from "../../../common/FormTimePicker";
import { FormDropdown } from "../../../common/FormDropdown";
import { Button } from "../../ui/button";
import { bookingFilterInitialValues } from "../../../constants/initialValues";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}

export const BookingFilterModal = ({ isOpen, onClose, onSubmit }: FilterModalProps) => {
    const handleSubmit = (values: any) => {
        onSubmit(values);
        onClose();
    };

    return (
        <section
            className={`
                fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                bg-black/30 backdrop-blur-sm transition-all duration-300 z-50 
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 mx-4
                    ${isOpen ? "scale-100" : "scale-95"}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center gap-5 px-8 py-6 border-b border-gray-200">
                    <button
                        onClick={onClose}
                        className="text-gray-400 border border-[#E7E7E7] bg-[#F7F7F7] transition-colors p-2 rounded-lg"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Filter Options</h2>
                        <p className="text-gray-700">Manage Users</p>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="bg-[#F4F5FA]">
                    <Formik
                        initialValues={bookingFilterInitialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="space-y-4 px-8 py-6">

                                    <FormDropdown
                                        name="status"
                                        label="Status"
                                        placeholder="Choose Status"
                                        options={['Pending', 'Confirmed', 'Completed', 'Cancelled']}
                                    />
                                    <FormDropdown
                                        name="service_boy"
                                        label="Service Boy"
                                        placeholder="Choose Service Boy"
                                        options={['service boy 1', 'service boy 2', 'service boy 3']}
                                    />
                                    <FormDropdown
                                        name="address"
                                        label="Address"
                                        placeholder="Address"
                                        options={['address 1', 'address 2', 'address 3']}
                                    />
                                    <FormDatePicker
                                        name="date"
                                        label="Date"
                                        placeholder="Date"
                                        checkmark={false}
                                    />
                                    <FormTimePicker
                                        name="time"
                                        label="Time"
                                        placeholder="Time"
                                    />
                                </div>

                                {/* Modal Footer */}
                                <div className="flex gap-4 items-stretch mt-8 p-6 bg-white shadow-2xl">
                                    <Button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg  h-full w-[60%]"
                                    >
                                        Apply Filters
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                        }}
                                        className="px-6 py-3 bg-[#EFEFEF] text-gray-700 rounded-xl font-semibold w-[40%]"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

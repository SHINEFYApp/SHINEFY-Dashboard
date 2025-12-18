import { Formik, Form } from "formik";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import type { ReactNode } from "react";

interface GenericFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialValues: any;
    title?: string;
    subtitle?: string;
    children: ReactNode;
}

export const GenericFilterModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues,
    title = "Filter Options",
    subtitle = "Refine your search",
    children
}: GenericFilterModalProps) => {
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
                        className="text-gray-400 border border-[#E7E7E7] bg-[#F7F7F7] transition-colors p-2 rounded-lg hover:bg-gray-200"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-700">{subtitle}</p>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="bg-[#F4F5FA]">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="space-y-4 px-8 py-6">
                                    {children}
                                </div>

                                {/* Modal Footer */}
                                <div className="flex gap-4 items-stretch mt-8 p-6 bg-white shadow-2xl">
                                    <Button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg h-full w-[60%]"
                                    >
                                        Apply Filters
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                        }}
                                        className="px-6 py-3 bg-[#EFEFEF] text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors w-[40%]"
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

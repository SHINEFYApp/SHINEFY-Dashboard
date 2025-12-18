import { useState } from "react";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { GenericModal } from "../../common/GenericModal";
import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import { manageColorColumns } from "../../columns/manageColorColumns";
import { dummyColorData } from "../../constants/data";
import { FormInput } from "../../common/FormInput";

const ManageColor = () => {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSearchSubmit = (values: any) => {
        console.log(values);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalEntries = dummyColorData.length;
    const totalPages = Math.ceil(totalEntries / pageSize);

    return (
        <section>

            {/* Filter Section */}
            <FilterHeader
                subtitle="Manage Color"
                searchInitialValues={{ search: '' }}
                onSearchSubmit={handleSearchSubmit}
                filterInitialValues={{ search: '' }}
                onFilterSubmit={(values) => console.log(values)}
                actionButtons={[
                    {
                        label: "Add Color",
                        onClick: () => setOpenWindowAddAmount(true),
                        variant: "primary"
                    }
                ]}
                showExport={false}
            />

            {/* Table Section */}
            <CustomTable
                columns={manageColorColumns}
                data={dummyColorData}
                currentPage={currentPage}
                totalPages={totalPages}
                totalEntries={totalEntries}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />

            <GenericModal
                isOpen={openWindowAddAmount}
                onClose={() => setOpenWindowAddAmount(false)}
                title="Add Color"
            >
                <Formik
                    initialValues={{
                        colorCode: '',
                        englishColorName: '',
                        arabicName: '',
                        image: null
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        setOpenWindowAddAmount(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">

                                <FormInput
                                    name="colorCode"
                                    label="Color Code"
                                    placeholder="Enter color code"
                                />
                                <FormInput
                                    name="englishName"
                                    label="Model Name (English)"
                                    placeholder="Enter model name in English"
                                />
                                <FormInput
                                    name="arabicName"
                                    label="Model Name (Arabic)"
                                    placeholder="Enter model name in Arabic"
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpenWindowAddAmount(false)}
                                    className="w-1/3 text-lg hover:bg-transparent"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-2/3 bg-primary text-black hover:bg-primary/90 text-lg"
                                >
                                    Add
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </GenericModal>
        </section>
    );
};

export default ManageColor;
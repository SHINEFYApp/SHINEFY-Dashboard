import { useEffect, useState } from "react";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { GenericModal } from "../../common/GenericModal";
import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import { manageColorColumns } from "../../columns/manageColorColumns";
import { FormInput } from "../../common/FormInput";
import { getColorsList } from "../../api/features/manageVehicles.services";
import { toast } from "sonner";
import { useGet } from "../../api/useGetData";
import { usePost } from "../../api/usePostData";
import { useSearchParams } from "react-router-dom";

const ManageColor = () => {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('search') || '';
    const pageSize = 10;

    const baseURL = import.meta.env.VITE_API_URL;

    // Fetch colors using useGet hook
    const { data: colorsResponse, isLoading, isError, error, isSuccess, refetch } = useGet({
        queryKey: ['colors', currentPage, searchQuery],
        queryFn: () => getColorsList({ page: currentPage, per_page: pageSize, search: searchQuery }),
        options: { staleTime: 1000 * 10 }
    });

    // Add color using usePost hook
    const addColorMutation = usePost<any, any>({
        route: `${baseURL}/admin/api/colors`,
        options: {
            onSuccess: () => {
                toast.success('Color added successfully');
                setOpenWindowAddAmount(false);
                refetch();
                setSearchParams({ page: '1', search: searchQuery });
            },
            onError: (err: any) => {
                console.error('Error adding color:', err);
                toast.error(err.response?.data?.message || 'Failed to add color');
            }
        }
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message || 'Failed to fetch colors');
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('The Process Of Fetching Data Has Successfully');
        }
    }, [isSuccess]);

    const handleSearchSubmit = (values: any) => {
        setSearchParams({ page: '1', search: values.search });
    };

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString(), search: searchQuery });
    };

    const handleAddColor = async (values: any, { setSubmitting, resetForm }: any) => {
        const payload = {
            color_code: values.colorCode,
            color_name: values.englishName,
            color_name_arabic: values.arabicName
        };

        addColorMutation.mutate(payload, {
            onSuccess: () => {
                resetForm();
                setSubmitting(false);
            },
            onError: () => {
                setSubmitting(false);
            }
        });
    };

    const colorsData = colorsResponse?.data?.colors || [];
    const pagination = colorsResponse?.data?.pagination || { total: 0, last_page: 1 };

    return (
        <section>
            <FilterHeader
                subtitle="Manage Color"
                searchInitialValues={{ search: searchQuery }}
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

            <CustomTable
                columns={manageColorColumns}
                data={colorsData}
                currentPage={currentPage}
                totalPages={pagination.last_page}
                totalEntries={pagination.total}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                isLoading={isLoading}
            />

            <GenericModal
                isOpen={openWindowAddAmount}
                onClose={() => setOpenWindowAddAmount(false)}
                title="Add Color"
            >
                <Formik
                    initialValues={{
                        colorCode: '',
                        englishName: '',
                        arabicName: ''
                    }}
                    onSubmit={handleAddColor}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="colorCode"
                                    label="Color Code"
                                    placeholder="Enter color code (e.g., #FFFFFF)"
                                />
                                <FormInput
                                    name="englishName"
                                    label="Color Name (English)"
                                    placeholder="Enter color name in English"
                                />
                                <FormInput
                                    name="arabicName"
                                    label="Color Name (Arabic)"
                                    placeholder="Enter color name in Arabic"
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
                                    disabled={isSubmitting || addColorMutation.isPending}
                                    className="w-2/3 bg-primary text-black hover:bg-primary/90 text-lg"
                                >
                                    {isSubmitting || addColorMutation.isPending ? 'Adding...' : 'Add'}
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
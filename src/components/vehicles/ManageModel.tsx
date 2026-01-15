import { useEffect, useState } from "react";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { GenericModal } from "../../common/GenericModal";
import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import { manageModelColumns } from "../../columns/manageModelColumns";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { getMakesList, getModelsList } from "../../api/features/manageVehicles.services";
import { toast } from "sonner";
import { useGet } from "../../api/useGetData";
import { usePost } from "../../api/usePostData";
import { useSearchParams } from "react-router-dom";

const ManageModel = () => {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('search') || '';
    const pageSize = 10;

    const baseURL = import.meta.env.VITE_API_URL;

    // Fetch models using useGet hook
    const { data: modelsResponse, isLoading, isError, error, isSuccess, refetch } = useGet({
        queryKey: ['models', currentPage, searchQuery],
        queryFn: () => getModelsList({ page: currentPage, per_page: pageSize, search: searchQuery }),
        options: { staleTime: 1000 * 10 }
    });

    // Fetch makes for dropdown using useGet hook
    const { data: makesResponse } = useGet({
        queryKey: ['makes-options'],
        queryFn: () => getMakesList({ per_page: 100 }),
        options: { staleTime: 1000 * 60 }
    });

    const makesOptions = makesResponse?.data?.makes.map((make: any) => ({
        value: make.make_id.toString(),
        label: make.make_name
    })) || [];

    // Add model using usePost hook
    const addModelMutation = usePost<any, any>({
        route: `${baseURL}/admin/api/models`,
        options: {
            onSuccess: () => {
                toast.success('Model added successfully');
                setOpenWindowAddAmount(false);
                refetch();
                setSearchParams({ page: '1', search: searchQuery });
            },
            onError: (err: any) => {
                console.error('Error adding model:', err);
                toast.error(err.response?.data?.message || 'Failed to add model');
            }
        }
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message || 'Failed to fetch models');
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

    const handleAddModel = async (values: any, { setSubmitting, resetForm }: any) => {
        const payload = {
            make: Number(values.makeId),
            model: values.englishName,
            make_name_arabic: values.arabicName
        };

        addModelMutation.mutate(payload, {
            onSuccess: () => {
                resetForm();
                setSubmitting(false);
            },
            onError: () => {
                setSubmitting(false);
            }
        });
    };

    const modelsData = modelsResponse?.data?.models || [];
    const pagination = modelsResponse?.data?.pagination || { total: 0, last_page: 1 };

    return (
        <section>
            <FilterHeader
                subtitle="Manage Model"
                searchInitialValues={{ search: searchQuery }}
                onSearchSubmit={handleSearchSubmit}
                filterInitialValues={{ search: '' }}
                onFilterSubmit={(values) => console.log(values)}
                actionButtons={[
                    {
                        label: "Add Model",
                        onClick: () => setOpenWindowAddAmount(true),
                        variant: "primary"
                    }
                ]}
                showExport={false}
            />

            <CustomTable
                columns={manageModelColumns}
                data={modelsData}
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
                title="Add Model"
            >
                <Formik
                    initialValues={{
                        makeId: '',
                        englishName: '',
                        arabicName: ''
                    }}
                    onSubmit={handleAddModel}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <FormDropdown
                                    name="makeId"
                                    label="Select Make"
                                    placeholder="Choose Make"
                                    options={makesOptions}
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
                                    disabled={isSubmitting || addModelMutation.isPending}
                                    className="w-2/3 bg-primary text-black hover:bg-primary/90 text-lg"
                                >
                                    {isSubmitting || addModelMutation.isPending ? 'Adding...' : 'Add'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </GenericModal>
        </section>
    );
};

export default ManageModel;
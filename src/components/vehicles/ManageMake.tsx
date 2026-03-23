import { useEffect, useState } from 'react';
import { FilterHeader } from '../../common/FilterHeader';
import { CustomTable } from '../../common/CustomTable';
import { Formik, Form } from 'formik';
import { Button } from '../ui/button';
import { FormInput } from '../../common/FormInput';
import FileUploader from '../../common/fileUploader';
import { manageMakeColumns } from '../../columns/manageMakeColumns';
import { GenericModal } from '../../common/GenericModal';
import { getMakesList } from '../../api/features/manageVehicles.services';
import { toast } from 'sonner';
import { useGet } from '../../api/useGetData';
import { usePost } from '../../api/usePostData';
import { useSearchParams } from 'react-router-dom';

const ManageMake = () => {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('search') || '';
    const pageSize = 10;

    const baseURL = import.meta.env.VITE_API_URL;

    // Fetch makes using useGet hook
    const { data: makesResponse, isLoading, isError, error, isSuccess, refetch } = useGet({
        queryKey: ['makes', currentPage, searchQuery],
        queryFn: () => getMakesList({ page: currentPage, per_page: pageSize, search: searchQuery }),
        options: { staleTime: 1000 * 10 }
    });

    // Add make using usePost hook
    const addMakeMutation = usePost<any, FormData>({
        route: `${baseURL}/api/makes`,
        options: {
            onSuccess: () => {
                toast.success('Make added successfully');
                setOpenWindowAddAmount(false);
                refetch();
                setSearchParams({ page: '1', search: searchQuery });
            },
            onError: (err: any) => {
                console.error('Error adding make:', err);
                toast.error(err.response?.data?.message || 'Failed to add make');
            }
        }
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message || 'Failed to fetch makes');
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

    const handleAddMake = async (values: any, { setSubmitting, resetForm }: any) => {
        const formData = new FormData();
        formData.append('make', values.englishName);
        formData.append('make_name_arabic', values.arabicName);
        if (values.image && values.image[0]) {
            formData.append('image', values.image[0]);
        }

        addMakeMutation.mutate(formData, {
            onSuccess: () => {
                resetForm();
                setSubmitting(false);
            },
            onError: () => {
                setSubmitting(false);
            }
        });
    };

    const makesData = makesResponse?.data?.makes || [];
    const pagination = makesResponse?.data?.pagination || { total: 0, last_page: 1 };

    return (
        <section>
            <FilterHeader
                subtitle="Manage Make"
                searchInitialValues={{ search: searchQuery }}
                onSearchSubmit={handleSearchSubmit}
                filterInitialValues={{ search: '' }}
                onFilterSubmit={(values) => console.log(values)}
                actionButtons={[
                    {
                        label: "Add Make",
                        onClick: () => setOpenWindowAddAmount(true),
                        variant: "primary"
                    }
                ]}
                showExport={false}
            />

            <CustomTable
                columns={manageMakeColumns}
                data={makesData}
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
                title="Add Make"
            >
                <Formik
                    initialValues={{
                        englishName: '',
                        arabicName: '',
                        image: null
                    }}
                    onSubmit={handleAddMake}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="englishName"
                                    label="Make Name (English)"
                                    placeholder="Enter make name in English"
                                />
                                <FormInput
                                    name="arabicName"
                                    label="Make Name (Arabic)"
                                    placeholder="Enter make name in Arabic"
                                />
                                <FileUploader
                                    name="image"
                                    title="Image Upload"
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
                                    disabled={isSubmitting || addMakeMutation.isPending}
                                    className="w-2/3 bg-primary text-black hover:bg-primary/90 text-lg"
                                >
                                    {isSubmitting || addMakeMutation.isPending ? 'Adding...' : 'Add'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </GenericModal>
        </section>
    );
};

export default ManageMake;
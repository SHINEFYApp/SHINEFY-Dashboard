import { useEffect, useState } from 'react';
import { FilterHeader } from '../../common/FilterHeader';
import { CustomTable } from '../../common/CustomTable';
import { GenericModal } from '../../common/GenericModal';
import { Form, Formik } from 'formik';
import { Button } from '../ui/button';
import { FormInput } from '../../common/FormInput';
import { manageCarCategoryColumns } from '../../columns/manageCarCategoryColumns';
import FileUploader from '../../common/fileUploader';
import { getCategoriesList } from '../../api/features/manageVehicles.services';
import { toast } from 'sonner';
import { useGet } from '../../api/useGetData';
import { usePost } from '../../api/usePostData';
import { useSearchParams } from 'react-router-dom';

const ManageCarCategory = () => {
    const [openWindowAddAmount, setOpenWindowAddAmount] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('search') || '';
    const pageSize = 10;

    const baseURL = import.meta.env.VITE_API_URL;

    // Fetch categories using useGet hook
    const { data: categoriesResponse, isLoading, isError, error, isSuccess, refetch } = useGet({
        queryKey: ['categories', currentPage, searchQuery],
        queryFn: () => getCategoriesList({ page: currentPage, per_page: pageSize, search: searchQuery }),
        options: { staleTime: 1000 * 10 }
    });

    // Add category using usePost hook
    const addCategoryMutation = usePost<any, FormData>({
        route: `${baseURL}/api/categories`,
        options: {
            onSuccess: () => {
                toast.success('Category added successfully');
                setOpenWindowAddAmount(false);
                refetch();
                setSearchParams({ page: '1', search: searchQuery });
            },
            onError: (err: any) => {
                console.error('Error adding category:', err);
                toast.error(err.response?.data?.message || 'Failed to add category');
            }
        }
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message || 'Failed to fetch categories');
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

    const handleAddCategory = async (values: any, { setSubmitting, resetForm }: any) => {
        const formData = new FormData();
        formData.append('category_name', values.englishName);
        formData.append('category_name_arabic', values.arabicName);
        if (values.image && values.image[0]) {
            formData.append('image', values.image[0]);
        }

        addCategoryMutation.mutate(formData, {
            onSuccess: () => {
                resetForm();
                setSubmitting(false);
            },
            onError: () => {
                setSubmitting(false);
            }
        });
    };

    const categoriesData = categoriesResponse?.data?.categories || [];
    const pagination = categoriesResponse?.data?.pagination || { total: 0, last_page: 1 };

    return (
        <section>
            <FilterHeader
                subtitle="Manage Car Category"
                searchInitialValues={{ search: searchQuery }}
                onSearchSubmit={handleSearchSubmit}
                filterInitialValues={{ search: '' }}
                onFilterSubmit={(values) => console.log(values)}
                actionButtons={[
                    {
                        label: "Add Car Category",
                        onClick: () => setOpenWindowAddAmount(true),
                        variant: "primary"
                    }
                ]}
                showExport={false}
            />

            <CustomTable
                columns={manageCarCategoryColumns}
                data={categoriesData}
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
                title="Add Car Category"
            >
                <Formik
                    initialValues={{
                        englishName: '',
                        arabicName: '',
                        image: null
                    }}
                    onSubmit={handleAddCategory}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="englishName"
                                    label="Category Name (English)"
                                    placeholder="Enter category name in English"
                                />
                                <FormInput
                                    name="arabicName"
                                    label="Category Name (Arabic)"
                                    placeholder="Enter category name in Arabic"
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
                                    disabled={isSubmitting || addCategoryMutation.isPending}
                                    className="w-2/3 bg-primary text-black hover:bg-primary/90 text-lg"
                                >
                                    {isSubmitting || addCategoryMutation.isPending ? 'Adding...' : 'Add'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </GenericModal>
        </section>
    );
};

export default ManageCarCategory;
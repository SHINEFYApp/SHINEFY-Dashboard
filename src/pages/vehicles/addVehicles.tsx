import { Formik, Form } from 'formik';
import { addVehicleSchema } from '../../constants/validationSchema';
import { addVehicleInitialValues } from '../../constants/initialValues';
import { FormDropdown } from '../../common/FormDropdown';
import { CarFront, LayoutGrid, ScrollText, SprayCan, UserRound } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import type { addVehiclesFormData } from '../../types/vehicles';

export default function AddVehicles() {
    const [formData, setFormData] = useState<addVehiclesFormData>({
        user: '',
        category: '',
        make: '',
        model: '',
        color: '',
    });

    console.log(formData);




    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 h-screen md:p-6 rounded-2xl">
                <h1 className="text-[20px] font-bold mb-8">Enter vehicle information</h1>
                <Formik
                    initialValues={{
                        ...addVehicleInitialValues,
                        user: formData.user || addVehicleInitialValues.user,
                        category: formData.category || addVehicleInitialValues.category,
                        make: formData.make || addVehicleInitialValues.make,
                        model: formData.model || addVehicleInitialValues.model,
                        color: formData.color || addVehicleInitialValues.color,
                    }}
                    validationSchema={addVehicleSchema}
                    onSubmit={(values) => {
                        setFormData({ ...formData, ...values });
                    }}
                >
                    {({ isValid }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormDropdown
                                    name="user"
                                    label="User"
                                    placeholder="Select User"
                                    icon={<UserRound className="w-5 h-5" />}
                                    options={[
                                        'user one',
                                        'user two',
                                        'user three'
                                    ]}
                                />
                                <FormDropdown
                                    name="category"
                                    label="Category"
                                    placeholder="Select Category"
                                    icon={<LayoutGrid className="w-5 h-5" />}
                                    options={[
                                        'category one',
                                        'category two',
                                        'category three'
                                    ]}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormDropdown
                                    name="make"
                                    label="Make"
                                    placeholder="Select Make"
                                    icon={<CarFront className="w-5 h-5" />}
                                    options={[
                                        'make one',
                                        'make two',
                                        'make three'
                                    ]}
                                />
                                <FormDropdown
                                    name="model"
                                    label="Model"
                                    placeholder="Select Model"
                                    icon={<ScrollText className="w-5 h-5" />}
                                    options={[
                                        'model one',
                                        'model two',
                                        'model three'
                                    ]}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormDropdown
                                    name="color"
                                    label="Color"
                                    placeholder="Select Color"
                                    icon={<SprayCan className="w-5 h-5" />}
                                    options={[
                                        'Color one',
                                        'Color two',
                                        'Color three'
                                    ]}
                                />
                            </div>
                            <div className="flex justify-start">
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[356px] h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Add Vehicle
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
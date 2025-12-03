import { Formik, Form } from 'formik';
import { addSubAdminSchema } from '../../constants/validationSchema';
import { addSubAdminInitialValues } from '../../constants/initialValues';
import { Button } from '../../components/ui/button';
import { FormInput } from '../../common/FormInput';
import { useEffect, useState } from 'react';
import type { smsStatus } from '../../types/common';
import type { manageSubadmin } from '../../types/users&staff';
import DropDownAndSelect from '../../common/dropDownAndSelect';

export default function AddSubAdmin() {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

    const [receiveSmsStatus, setReceiveSmsStatus] = useState<smsStatus>({
        status: true,
        isSms: false
    });

    const [formData, setFormData] = useState<manageSubadmin>({
        name: '',
        phoneNumber: '',
        isSms: false,
        email: '',
        password: '',
        confirmPassword: '',
        privileges: []
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, isSms: receiveSmsStatus.isSms }));
    }, [receiveSmsStatus.isSms]);

    useEffect(() => {
        setFormData(prev => ({ ...prev, privileges: selectedOptions }));
    }, [selectedOptions]);

    console.log(formData);




    return (
        <main>
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <h1 className="text-[20px] font-bold mb-8">Enter Sub Admin information</h1>
                <Formik
                    initialValues={addSubAdminInitialValues}
                    validationSchema={addSubAdminSchema}
                    onSubmit={(values) => {
                        setFormData({ ...formData, ...values });
                    }}
                >
                    {({ isValid }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 grid-flow-dense">
                                <div className="order-2 md:order-1 grid grid-cols-1 gap-6 mb-8">
                                    <FormInput
                                        name="name"
                                        label="Name"
                                        placeholder="Name"
                                        type="text"
                                    />

                                    <FormInput
                                        name="phoneNumber"
                                        label="Phone Number"
                                        placeholder="Phone Number"
                                        type="tel"
                                        receiveSms={receiveSmsStatus}
                                        setReceiveSms={setReceiveSmsStatus}
                                    />

                                    <FormInput
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                    />
                                    <FormInput
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                    />
                                    <FormInput
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                </div>
                                <div className="order-1 md:order2 h-fit w-full flex justify-center">
                                    <div className=' flex flex-col justify-center items-start'>
                                        <h1 className='font-bold capitalize'>your profile</h1>
                                        <p className='text-[#616161] pb-5'>This will be displayed on your profile.</p>
                                        <div className='w-60 h-60 bg-[#B0B0B0] rounded-md'>
                                            {/* <img className='size-full' src="" alt="" /> */}
                                        </div>
                                        <div className='flex w-60 items-center py-5 gap-5'>
                                            <button className='text-[#B0B0B0]'>Delete</button>
                                            <button className='text-[#FFC107]'>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DropDownAndSelect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
import { Form, Formik } from "formik";
import Coupon from "../../../components/coupon/coupon";
import { FormInput } from "../../../common/FormInput";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";
import { exportTypes } from "../../../constants/data";

export default function ManageCoupon(){
    const CouponLayoutCount = [
        {color: 'green'},
        {color: 'red'},
        {color: 'green'},
        {color: 'red'},
        {color: 'green'},
        {color: 'green'},
        {color: 'green'},
        {color: 'green'},
        {color: 'red'},
    ]
    const handleSubmit = (values : {search : string , export: string}) => {
        console.log(`Search values: ${values.search} | Export File Extantion: ${values.export} `);
    };
    return(
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <div className="mb-10">
                <Formik
                    initialValues={{
                        search: '',
                        export: '',
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({}) => (
                        <Form>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
                                        <FormInput
                                            name="search"
                                            label=""
                                            placeholder="Search"
                                            icon={<Search className="w-5 h-5" />}
                                            className="mb-0"
                                            checkmark={false}
                                            />
                                    </div>,
                                    <button
                                        type="submit"
                                        className="w-full md:w-[108px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                        Search
                                    </button>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-5">
                                    <Link
                                        to={"/services&extra/manage/coupon/addCoupon"}
                                        className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                        >
                                        Add Coupon
                                    </Link>
                                    <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                    <div className="w-full lg:w-[135px]">
                                        <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {CouponLayoutCount.map((coupon , i) => {
                    return(
                        <div key={i} >
                            <Coupon color={coupon.color} />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
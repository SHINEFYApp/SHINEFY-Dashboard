import './logInStyle.css'
import Thunder from "@/assets/images/logIn/thunder.png";
import LogInForm from './form';

export default function LogIn() {

    return (
        <section className="w-full flex justify-center items-center  bg-login h-auto min-h-screen m-auto overflow-hidden">
            <div className='max-w-[1512px]'>
                <div className=" w-[506px] h-[487px] flex flex-col gap-[30px] p-5 md:p-0">
                    <div className="flex">
                        <div className="w-[80%] h-[78px] flex flex-col gap-4">
                            <h1 className="text-[20px] xl:text-[30px] font-bold text-[#212121]">Get’s started.</h1>
                            <div className="flex items-center w-full font-medium text-[15px] xl:text-[18px]">
                                <p>Don’t have an account?</p>
                                <button className="text-[#FFC107] cursor-pointer">Sign up</button>
                            </div>
                        </div>
                        <div className="w-[20%] flex justify-end">
                            <img className="w-[48.51px] h-[48.51px]" src={Thunder} alt="" />
                        </div>
                    </div>
                    <LogInForm />
                </div>
            </div>
        </section>
    );
}

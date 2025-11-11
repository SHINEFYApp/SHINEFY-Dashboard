import './logInStyle.css'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BsEye } from "react-icons/bs";
import Thunder from "@/assets/images/logIn/thunder.png";
export default function LogIn() {
  return (
    <section className="w-full max-w-[1512px] bg-login h-auto flex justify-center items-center min-h-screen m-auto overflow-hidden">
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
        <div className="w-full h-[379px] flex flex-col gap-[30px]">
            <div className="w-full h-[244px] rounded-[10px] border border-[#F4F5F6] p-5 bg-[#FFFFFF] flex flex-col gap-2.5">
                <div className="h-[92px] w-full flex flex-col gap-3" >
                    <Label htmlFor="email" className='text-[16px] font-medium text-[#242731]'>Email</Label>
                    <Input type="email" id="email" className='h-[59px] placeholder:text-[16px] outline-0 placeholder:text-[#616161] rounded-[10px] border border-[#616161] py-[19px] px-5' placeholder="uistore@gmail.com" />
                </div>
                <div className="h-[92px] w-full flex flex-col gap-3" >
                    <Label htmlFor="password" className='text-[16px] font-medium text-[#242731]'>Password</Label>
                    <div className="w-full h-[59px] relative">
                        <Input type="password" id="password" className='size-full placeholder:text-[16px] outline-0 placeholder:text-[#616161] rounded-[10px] border border-[#616161] py-[19px] px-5' placeholder="password" />
                        <div className="h-full w-[15%] flex justify-center items-center absolute top-0 right-0">
                            <button className="cursor-pointer">
                                <BsEye />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between text-[13px] xl:text-[16px] items-center">
                <div className="flex items-center gap-3 text-[#616161]">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember Me</Label>
                </div>
                <a href="#" className="text-[#FFC107] font-medium">Forgot your password?</a>
            </div>
            <div className="w-full h-[60px] rounded-[10px] overflow-hidden">
                <button className="size-full bg-[#FFC107] cursor-pointer text-[#FFFAF7] text-[20px] font-bold">Sign in</button>
            </div>
        </div>
      </div>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import './logInStyle.css'
import Thunder from "@/assets/images/logIn/thunder.png";
import LogInForm from './form';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';

export default function LogIn() {
  const { t } = useTranslation();

    return (
        <section className="w-full flex justify-center items-center  bg-login h-auto min-h-screen m-auto overflow-hidden">
            <div className='max-w-[1512px]'>
                <div className=" w-[506px] h-[487px] flex flex-col gap-[30px] p-5 md:p-0">
                    <div className="flex">
                        <div className="w-[80%] h-[78px] flex flex-col gap-4">
                            <h1 className="text-[20px] xl:text-[30px] font-bold text-[#212121]">{t('login.getStarted')}</h1>
                            <div className="flex items-center w-full font-medium text-[15px] xl:text-[18px]">
                                <p>{t('login.dontHaveAccount')}</p>
                                <button className="text-[#FFC107] cursor-pointer">{t('login.signUp')}</button>
                            </div>
                        </div>
                        <div className="w-[20%] flex justify-end">
                            <img className="w-[48.51px] h-[48.51px]" src={Thunder} alt="" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                      <LanguageSwitcher />
                    </div>
                    <LogInForm />
                </div>
            </div>
        </section>
    );
}

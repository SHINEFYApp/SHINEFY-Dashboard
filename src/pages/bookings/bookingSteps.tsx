import ServicesStep1 from "../../components/booking/tabs/services/steps/ServicesStep1";
import ServicesStep2 from "../../components/booking/tabs/services/steps/ServicesStep2";
import ServicesStep3 from "../../components/booking/tabs/services/steps/ServicesStep3";
import ServicesStep4 from "../../components/booking/tabs/services/steps/ServicesStep4";

const steps = [
        {
            id: 1 ,
            step : ServicesStep1
        },
        {
            id: 2 ,
            step : ServicesStep2
        },
        {
            id: 3 ,
            step : ServicesStep3
        },
        {
            id: 4 ,
            step : ServicesStep4
        },
    ]


export const FindStep = (activeTab: string , currentStep : number) => {
    if(activeTab === 'services'){
        return steps.find((el) => el.id === currentStep)?.step || ServicesStep1;
    }else{
        return steps.filter((el) => el.id !== 3 ).find((el) => el.id === currentStep)?.step || ServicesStep1;
    }
}
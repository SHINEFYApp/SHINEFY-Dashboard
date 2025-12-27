import { Form, Formik } from "formik"
import { Button } from "../../../components/ui/button"
import type { addGroupProps, addGroupTypes } from "../../../types/users&staff"
import { FormInput } from "../../../common/FormInput"
import { FormDataList } from "../../../common/dataList"
import { carWashMachines, egyptRegions, exNames } from "../../../constants/data"
import { Check, SlidersHorizontal, X } from "lucide-react"
import { useState, type Dispatch, type SetStateAction } from "react"
import { FormDatePicker } from "../../../common/FormDatePicker"
import { cn } from "../../../utils/utils"

interface renderProps {
    wordOfreder : string , 
    setAddGroup : Dispatch<SetStateAction<addGroupTypes>>
    addGroup : addGroupTypes
    setWordToRender :  Dispatch<SetStateAction<string>>
}

const render = ({wordOfreder , setAddGroup , addGroup , setWordToRender} : renderProps) => {
    if(wordOfreder === 'orginal') {
        return(
            <>
                <h1 className=" text-[#242731] text-[25px] font-bold">Add Group</h1>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        initialValues={{
                            groupName: '',
                            chooseUser: []
                        }}
                        onSubmit={(values) => {
                            // setAddGroup({data : {groupName : values.groupName , users: values.chooseUser } , state : false})
                            console.log(values)
                        }}
                    >
                        {({ }) => (
                            <Form>
                                <div className=" grid grid-cols-1 w-[523px]">
                                    <div className=" mt-5">
                                        <FormInput
                                            name="groupName"
                                            label="Group Name"
                                            placeholder="Group Name"
                                            type="text"
                                        />
                                        <div className="flex gap-5 mt-2 items-end">
                                            <FormDataList
                                                name="chooseUser"
                                                label="Choose User"
                                                placeholder="Choose User"
                                                options={exNames}
                                                className=" w-[90%]"
                                            />
                                            <button onClick={() => {
                                                setWordToRender('select users')
                                            }} className=" w-[10%] flex h-[47px] mb-0.5 justify-center items-center bg-black rounded-lg">
                                                <SlidersHorizontal color="white" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center flex-wrap mt-10">
                                        {addGroup.data.users.length > 0 &&
                                            addGroup.data.users.map((name) => (
                                            <button
                                                key={name}
                                                type="button"
                                                onClick={() => {
                                                setAddGroup({
                                                    ...addGroup,
                                                    data: {
                                                    ...addGroup.data,
                                                    users: addGroup.data.users.filter(
                                                        (user) => user !== name
                                                    ),
                                                    },
                                                });
                                                }}
                                                className="py-2 px-5 flex items-center gap-2 rounded-lg bg-[#F3F4F6] hover:bg-red-50 transition-colors"
                                            >
                                                {name}
                                                <X size={15} color="red" />
                                            </button>
                                        ))}
                                    </div>

                                    <div className=" w-full p-5 bg-white flex justify-between items-center absolute bottom-0 left-0">
                                        <button
                                            type="button"
                                            onClick={() => setAddGroup({...addGroup , state : false})}
                                            className="w-[168px] border h-[54px] border-black rounded-[10px] text-[16px]"
                                        >
                                            Back
                                        </button>
                                        <Button
                                            type="submit"
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[54px] rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        )
    }else {
        return(
            <>
                <h1 className=" text-[#242731] text-[25px] font-bold">Choose User</h1>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        initialValues={{
                            chooseArea : '',
                            chooseDeviceType : '',
                            registrationStart : '',
                            registrationEnd : '',
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {({ }) => (
                            <Form>
                                <div className=" grid grid-cols-1 w-[523px]">
                                    <div className=" grid grid-cols-2 gap-2 mt-5">
                                            <FormDataList
                                                name="chooseArea"
                                                label="Choose Area"
                                                placeholder="Choose Area"
                                                options={egyptRegions}
                                            />
                                            <FormDataList
                                                name="chooseDeviceType"
                                                label="Choose Device Type"
                                                placeholder="Choose Device Type"
                                                options={carWashMachines}
                                            />
                                            <FormDatePicker
                                                name="registrationStart"
                                                label="Registration Start"
                                                checkmark={false}
                                            />
                                            <FormDatePicker
                                                name="registrationEnd"
                                                label="Registration End"
                                                checkmark={false}
                                            />
                                    </div>
                                    <button type="submit" className="bg-[#191919] text-white rounded-lg mt-5 text-[20px] py-2 font-bold">
                                        Search
                                    </button>
                                   <div className="bg-[#F4F5FA] flex p-5 rounded-xl flex-col gap-2 mt-10 overflow-auto h-[250px]">
                                        {exNames.map((name) => {
                                            const isSelected = addGroup.data.users.includes(name); 
                                            return (
                                            <button
                                                key={name}
                                                type="button"
                                                onClick={() => {
                                                setAddGroup({
                                                    ...addGroup,
                                                    data: {
                                                    ...addGroup.data,
                                                    users: isSelected
                                                        ? addGroup.data.users.filter((user) => user !== name) 
                                                        : [...addGroup.data.users, name],
                                                    },
                                                });
                                                }}
                                                className={cn(
                                                "flex justify-between items-center py-2 px-5 rounded-lg transition-all"
                                                )}
                                            >
                                                {name}
                                                <div className={cn("w-5 h-5 rounded flex justify-center items-center", isSelected ? "bg-green-600" : 'bg-black/10')}>
                                                    {isSelected &&
                                                        <Check size={15} color="white" />
                                                    }
                                                </div>
                                            </button>
                                            );
                                        })}
                                    </div>

                                    <div className=" w-full p-5 bg-white flex justify-between items-center absolute bottom-0 left-0">
                                        <button
                                            type="button"
                                            onClick={() => setWordToRender('orginal')}
                                            className="w-[168px] border h-[54px] border-black rounded-[10px] text-[16px]"
                                        >
                                            Back
                                        </button>
                                        <Button
                                            type="button"
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[54px] rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        )
    }
}

export default function AddGroup({addGroup , setAddGroup} : addGroupProps){
    const [wordToRender , setWordToRender] = useState<string>('orginal')
    console.log(addGroup)
    return(
         <section
            className={`
                fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                bg-black/30 backdrop-blur-xs transition-all duration-300
                ${addGroup.state ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
            `}
        >
            <div className={`${wordToRender === 'orginal' ? 'w-[678px] h-[579px]  bg-[#F7F7F7]' : 'h-[90%] w-[678px] bg-[#FFFFFF]'} p-5 relative overflow-hidden rounded-xl transition-transform duration-300 
                ${addGroup.state ? "scale-100" : "scale-95"}
            `}>
                {render({ wordOfreder: wordToRender , setAddGroup, addGroup , setWordToRender })}
            </div>
        </section>
    )
}
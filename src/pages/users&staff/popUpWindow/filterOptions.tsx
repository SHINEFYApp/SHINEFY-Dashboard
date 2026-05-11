import { GenericFilterModal } from "../../../common/GenericFilterModal";
import { FormInput } from "../../../common/FormInput";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { manageUsersInitioalValue } from "../../../constants/initialValues";
import type { filteroptionsProps } from "../../../types/users&staff";

export default function FillterOptions({filterOptions , setFilterOptions} : filteroptionsProps){
    return(
        <GenericFilterModal
            isOpen={filterOptions.state}
            onClose={() => setFilterOptions(prev => ({ ...prev, state: false }))}
            onSubmit={(values) => {
                setFilterOptions({data : values , state : false})
            }}
            initialValues={manageUsersInitioalValue}
            title="Filter options"
            subtitle="Manage Users"
        >
            <FormInput
                name="groupName"
                label="Group Name"
                placeholder="Group Name"
                type="text"
            />
            <FormDropdown
                name="companyName"
                label="Company Name"
                placeholder="Company Name"
                options={[
                    'Company one',
                    'Company two',
                    'Company three'
                ]}
            />
            <FormDropdown
                name="areaName"
                label="Area Name"
                placeholder="Area Name"
                options={[
                    'Area one',
                    'Area two',
                    'Area three'
                ]}
            />
            <FormDropdown
                name="deviceType"
                label="Device Type"
                placeholder="Device Type"
                options={[
                    'Type one',
                    'Type two',
                    'Type three'
                ]}
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
        </GenericFilterModal>
    )
}

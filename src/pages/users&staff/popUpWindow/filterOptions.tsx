import { GenericFilterModal } from "../../../common/GenericFilterModal";
import { FormInput } from "../../../common/FormInput";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { manageUsersInitioalValue } from "../../../constants/initialValues";
import type { filteroptionsProps } from "../../../types/users&staff";
import type { Company } from "../../../api/features/ManageUsers.services";

interface Props extends filteroptionsProps {
    companies?: Company[];
}

const loginTypeOptions = [
    { label: 'App (email/phone)', value: '0' },
    { label: 'Facebook', value: '1' },
    { label: 'Google', value: '2' },
    { label: 'Twitter', value: '3' },
    { label: 'Instagram', value: '4' },
    { label: 'Apple', value: '5' },
];

const statusOptions = [
    { label: 'Activated', value: '1' },
    { label: 'Deactivated', value: '0' },
];

const otpOptions = [
    { label: 'Verified', value: '1' },
    { label: 'Not Verified', value: '0' },
];

export default function FillterOptions({ filterOptions, setFilterOptions, companies }: Props) {
    const companyOptions = companies?.map(c => ({
        label: c.name,
        value: String(c.id),
    })) || [];

    return (
        <GenericFilterModal
            isOpen={filterOptions.state}
            onClose={() => setFilterOptions(prev => ({ ...prev, state: false }))}
            onSubmit={(values) => {
                setFilterOptions({ data: values, state: false });
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
                name="activeFlag"
                label="Status"
                placeholder="Select Status"
                options={statusOptions}
            />
            <FormDropdown
                name="otpVerify"
                label="OTP Status"
                placeholder="Select OTP Status"
                options={otpOptions}
            />
            <FormDropdown
                name="loginType"
                label="Login Type"
                placeholder="Select Login Type"
                options={loginTypeOptions}
            />
            <FormDropdown
                name="companyId"
                label="Company"
                placeholder="Select Company"
                options={companyOptions}
            />
            <FormDatePicker
                name="createtimeFrom"
                label="Registration Start"
                checkmark={false}
            />
            <FormDatePicker
                name="createtimeTo"
                label="Registration End"
                checkmark={false}
            />
        </GenericFilterModal>
    );
}
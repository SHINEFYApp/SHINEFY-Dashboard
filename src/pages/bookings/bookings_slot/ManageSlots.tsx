import { useState } from "react";
import { CustomTable } from "../../../common/CustomTable";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { dummySlotTableData } from "../../../constants/data";
import { manageSlotsSearchInitialValues } from "../../../constants/initialValues";
import { FilterHeader } from "../../../common/FilterHeader";

const types = ['type one', 'type two', 'type three'];
const status = ['Open', 'Closed'];
const exportTypes = ['CSV', 'Excel', 'PDF'];
import Table from "../../../components/tables/table";

const ManageSlot = () => {
    return (
        <main>
            <Table manageSectionFromComponant={'manageSlots'} />
        </main>
    );
};

export default ManageSlot;
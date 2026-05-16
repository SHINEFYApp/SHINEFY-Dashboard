import { araeForms } from "../../../constants/initialValues"
import { areaValidationSchema } from "../../../constants/validationSchema"
import { useNavigate } from "react-router-dom"
import { useAddArea } from "../../../api/features/areas.hooks"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import AreaForm from "../AreaForm"

export default function AddMainArea() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: addArea, isPending: isAdding } = useAddArea({
        onSuccess: () => {
            toast.success("Main Area added successfully");
            queryClient.invalidateQueries({ queryKey: ["main-areas"] });
            navigate('/geography&regions/manage/area');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add Area");
        }
    });

    return (
        <AreaForm
            title="Main Area Name"
            type="mainArea"
            initialValues={{
                ...araeForms,
                country: '',
                regions: '',
                areaName: '',
                area: []
            }}
            validationSchema={areaValidationSchema('mainArea')}
            submitLabel="Save"
            submittingLabel="Saving..."
            isPending={isAdding}
            onSubmit={(values) => {
                addArea({
                    country_id: Number(values.country) || 1,
                    region_id: Number(values.regions) || 1,
                    name: values.areaName,
                    area_type: 'main_area' as const,
                    coordinates: JSON.stringify(values.area)
                });
            }}
        />
    )
}

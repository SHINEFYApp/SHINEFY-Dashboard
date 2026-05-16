import { araeForms } from "../../../constants/initialValues"
import { areaValidationSchema } from "../../../constants/validationSchema"
import { useNavigate } from "react-router-dom"
import { useAddArea, useGetMainAreas } from "../../../api/features/areas.hooks"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import AreaForm from "../AreaForm"

export default function AddSubArea() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: addArea, isPending: isAdding } = useAddArea({
        onSuccess: () => {
            toast.success("Sub Area added successfully");
            queryClient.invalidateQueries({ queryKey: ["sub-areas"] });
            navigate('/geography&regions/manage/area?tab=subArea');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add Sub Area");
        }
    });

    const { data: mainAreasData } = useGetMainAreas({ limit: 100 });
    const mainAreaOptions = mainAreasData?.data?.data?.main_areas?.map((m: any) => ({
        label: m.main_area_name,
        value: m.id
    })) || [];

    return (
        <AreaForm
            title="Sub Area Name"
            type="subArea"
            initialValues={{
                ...araeForms,
                country: '',
                regions: '',
                areaName: '',
                subAreaName: '',
                area: []
            }}
            validationSchema={areaValidationSchema('subArea')}
            submitLabel="Save"
            submittingLabel="Saving..."
            isPending={isAdding}
            mainAreaOptions={mainAreaOptions}
            onSubmit={(values) => {
                addArea({
                    country_id: Number(values.country) || 1,
                    region_id: Number(values.regions) || 1,
                    main_area_id: Number(values.areaName),
                    name: values.subAreaName,
                    area_type: 'sub_area' as const,
                    coordinates: JSON.stringify(values.area)
                });
            }}
        />
    )
}

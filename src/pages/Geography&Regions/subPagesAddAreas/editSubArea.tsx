import { useEffect, useState } from "react"
import { araeForms } from "../../../constants/initialValues"
import { areaValidationSchema } from "../../../constants/validationSchema"
import { useNavigate, useParams } from "react-router-dom"
import { useEditArea, useGetSubAreas, useGetMainAreas, useGetAreaCoordinates } from "../../../api/features/areas.hooks"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import AreaForm from "../AreaForm"

export default function EditSubArea() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const areaId = Number(id);

    const { data: subAreasData, isLoading: listLoading } = useGetSubAreas({ limit: 100 });
    const { data: coordsData, isLoading: coordsLoading } = useGetAreaCoordinates(areaId, 'sub_area');
    const { data: mainAreasData } = useGetMainAreas({ limit: 100 });

    const [initialValues, setInitialValues] = useState({
        ...araeForms,
        country: '',
        regions: '',
        areaName: '',
        subAreaName: '',
        area: [] as { lat: number; lng: number }[]
    });

    const { mutate: editArea, isPending: isEditing } = useEditArea({
        onSuccess: () => {
            toast.success("Sub Area updated successfully");
            queryClient.invalidateQueries({ queryKey: ["sub-areas"] });
            navigate('/geography&regions/manage/area?tab=subArea');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update Sub Area");
        }
    });

    const mainAreaOptions = mainAreasData?.data?.data?.main_areas?.map((m: any) => ({
        label: m.main_area_name,
        value: m.id
    })) || [];

    useEffect(() => {
        if (subAreasData && coordsData) {
            const areas = subAreasData?.data?.data?.sub_areas || [];
            const area = areas.find((a: any) => a.id === areaId);
            if (area) {
                let parsedCoords: { lat: number; lng: number }[] = [];
                try {
                    const raw = coordsData?.data?.data?.coordinates || coordsData?.data?.coordinates || '[]';
                    parsedCoords = typeof raw === 'string' ? JSON.parse(raw) : raw;
                } catch (e) {
                    console.error("Failed to parse coordinates:", e);
                }
                setInitialValues({
                    country: '',
                    regions: '',
                    areaName: String(area.main_area_id || ''),
                    subAreaName: area.area_name || '',
                    area: parsedCoords
                });
            }
        }
    }, [subAreasData, coordsData, areaId]);

    return (
        <AreaForm
            title="Edit Sub Area"
            type="subArea"
            initialValues={initialValues}
            validationSchema={areaValidationSchema('subArea')}
            submitLabel="Update"
            submittingLabel="Updating..."
            isPending={isEditing}
            isLoading={listLoading || coordsLoading}
            loadingText="Loading sub area data..."
            mainAreaOptions={mainAreaOptions}
            onSubmit={(values) => {
                editArea({
                    id: areaId,
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

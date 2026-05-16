import { useEffect, useState } from "react"
import { araeForms } from "../../../constants/initialValues"
import { areaValidationSchema } from "../../../constants/validationSchema"
import { useNavigate, useParams } from "react-router-dom"
import { useEditArea, useGetMainAreas, useGetAreaCoordinates } from "../../../api/features/areas.hooks"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import AreaForm from "../AreaForm"

export default function EditMainArea() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const areaId = Number(id);

    const { data: mainAreasData, isLoading: listLoading } = useGetMainAreas({ limit: 100 });
    const { data: coordsData, isLoading: coordsLoading } = useGetAreaCoordinates(areaId, 'main_area');

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
            toast.success("Main Area updated successfully");
            queryClient.invalidateQueries({ queryKey: ["main-areas"] });
            navigate('/geography&regions/manage/area');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update Area");
        }
    });

    useEffect(() => {
        if (mainAreasData && coordsData) {
            const areas = mainAreasData?.data?.data?.main_areas || [];
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
                    country: String(area.country_id || ''),
                    regions: String(area.region?.id || ''),
                    areaName: area.main_area_name || '',
                    subAreaName: '',
                    area: parsedCoords
                });
            }
        }
    }, [mainAreasData, coordsData, areaId]);

    return (
        <AreaForm
            title="Edit Main Area"
            type="mainArea"
            initialValues={initialValues}
            validationSchema={areaValidationSchema('mainArea')}
            submitLabel="Update"
            submittingLabel="Updating..."
            isPending={isEditing}
            isLoading={listLoading || coordsLoading}
            loadingText="Loading area data..."
            onSubmit={(values) => {
                editArea({
                    id: areaId,
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

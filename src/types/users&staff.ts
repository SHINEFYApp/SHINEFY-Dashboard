import type { Dispatch, SetStateAction } from "react"

export interface manageSubadmin {
    name: string,
    phoneNumber: string,
    isSms: boolean ,
    email: string,
    password: string,
    confirmPassword: string,
    privileges : Record<number, string[]>
}

export interface filterOptionsTypes {
    state : boolean ,
    data : {
        groupName : string,
        companyName : string,
        areaName : string,
        deviceType : string,
        registrationStart : string,
        registrationEnd : string,
    }
}

export interface addGroupTypes {
    state : boolean ,
    data : {
        groupName : string,
        users: string[]
    }
}

export interface addGroupProps {
    addGroup : addGroupTypes
    setAddGroup : Dispatch<SetStateAction<addGroupTypes>>
    editingGroup?: { group_id: number; group_name: string; user_ids: number[] } | null
    setEditingGroup?: Dispatch<SetStateAction<{ group_id: number; group_name: string; user_ids: number[] } | null>>
}

export interface filteroptionsProps {
    filterOptions : filterOptionsTypes
    setFilterOptions :  Dispatch<SetStateAction<filterOptionsTypes>>
}
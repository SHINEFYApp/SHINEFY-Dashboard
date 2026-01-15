import type { FormikErrors } from "formik";
import type { DebouncedFunc } from "lodash";
import type { Dispatch, SetStateAction, JSX } from "react";

export interface MsgDetails {
    id: string,
    avatar : string,
    name : string,
    email : string,
    time : string,
    status : string,
    shortDiscussion : string,
    msgDetails : {
        date: string,
        head: string,
        body: string
    }
}[]


export interface windowState {
    isOpen : boolean,
    type : "newMessage" | "replyMessage" | null
}

export type ListType = "number" | "dot";
 
export interface leftGroupBtns {
    directionBtn : number
    isBold : boolean
    isItalic : boolean
    isUnderline : boolean
}

export type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};


export interface MsgLayoutProps {
    msgData: MsgDetails | null;
    setMsgData: React.Dispatch<React.SetStateAction<MsgDetails | null>>;
    openWindow? : windowState
    setOpenWindow: React.Dispatch<React.SetStateAction<windowState>>;
}


export interface ContactFormValues {
    to: string[]
    subject : string
    message: string;
    linkUrl: string;
    files: File[];
}


export interface messageProp {
    openWindow : windowState
    setOpenWindow: React.Dispatch<React.SetStateAction<windowState>>;
}

export interface ImagePreviewItem {
  id: string;
  file: File;
  url: string;
}

export interface listState {
    isNumber: boolean
    isDot: boolean
}


export interface editorBtn {
    setLeftBtns : Dispatch<SetStateAction<leftGroupBtns>> ,
    values : ContactFormValues ,
    setFieldValue : (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<ContactFormValues>>
    debouncedCommit : DebouncedFunc<(val: string) => void> ,
    currentDirBtn : {
        id: number;
        class: string;
        icon: JSX.Element;
    } | undefined ,
    setImagePreviews :  Dispatch<SetStateAction<ImagePreviewItem[]>> ,
    undo : () => void ,
    canUndo : boolean ,
    redo : () => void ,
    canRedo : boolean ,

}

export interface ToField {
    values : ContactFormValues ,
    setFieldValue : (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<ContactFormValues>>
}
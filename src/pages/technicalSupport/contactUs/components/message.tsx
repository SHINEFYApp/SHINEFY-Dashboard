"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Formik, Form } from "formik";
import { debounce } from "lodash";
import { useUndoRedo } from "../../../../hooks/useUndoRedo";
import EditorBtns from "./editorBtn";
import { ToInput } from "../../../../common/chipFeild";
import { validationMessageSchema } from "../../../../constants/validationSchema";
import type {
    ContactFormValues,
    ImagePreviewItem,
    leftGroupBtns,
    messageProp,
} from "../../../../types/msgDetails";
import {
  Paperclip,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  X,
} from "lucide-react";

export default function Message({ openWindow, setOpenWindow }: messageProp) {
    const [filePreviewsImages, setFilePreviewsImages] = useState<ImagePreviewItem[]>([]);
    const [filePreviewsFiles, setFilePreviewsFiles] = useState<ImagePreviewItem[]>([]);
    const [leftBtns, setLeftBtns] = useState<leftGroupBtns>({
        directionBtn: 1,
        isBold: false,
        isItalic: false,
        isUnderline: false,
    });

    /* Undo / Redo */
    const { value, set, undo, redo , canUndo, canRedo } = useUndoRedo<string>("");

    const debouncedCommit = useMemo(
        () => debounce((val: string) => set(val), 300),
        [set]
    );

    useEffect(() => debouncedCommit.cancel, [debouncedCommit]);

    /* Keyboard Shortcuts for Undo/Redo */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "z") {
            e.preventDefault();
            undo();
        }
        if (e.ctrlKey && e.key === "y") {
            e.preventDefault();
            redo();
        }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [undo, redo]);

    /* Direction buttons */
    const dirBtns = useMemo(() => [
        { id: 1, class: "text-start", icon: <TextAlignStart /> },
        { id: 2, class: "text-center", icon: <TextAlignJustify /> },
        { id: 3, class: "text-end", icon: <TextAlignEnd /> },
    ],[]);

    const currentDirBtn = dirBtns.find(
        (btn) => btn.id === leftBtns.directionBtn
    );

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    /* Cleanup URLs */
    useEffect(() => {
        return () => {
            filePreviewsImages.forEach((file) => URL.revokeObjectURL(file.url));
            filePreviewsFiles.forEach((file) => URL.revokeObjectURL(file.url));
        };
    }, [filePreviewsImages , filePreviewsFiles]);

    return (
        <Formik<ContactFormValues>
            initialValues={{
                to: [],
                subject: "",
                message: "",
                linkUrl: "",
                files: [],
            }}
            validationSchema={validationMessageSchema}
            onSubmit={(values) => console.log("SEND:", values)}
        >
        {({ values, setFieldValue, errors, touched, getFieldProps }) => {
            /* Remove file */
            const handleRemoveFile = useCallback(
                (id: string) => {
                    const updatedImages = filePreviewsImages.filter((f) => f.id !== id);
                    const updatedFiles = filePreviewsFiles.filter((f) => f.id !== id);
                    setFilePreviewsImages(updatedImages);
                    setFilePreviewsFiles(updatedFiles);
                    setFieldValue("images",  updatedImages.map((f) => f.file));
                    setFieldValue("files",  updatedFiles.map((f) => f.file));
                },
            [filePreviewsImages , filePreviewsFiles, setFieldValue]);

            /* Sync undo/redo */
            useEffect(() => {
                const syncField = async () => {
                    await setFieldValue("message", value);
                };
                syncField();
            }, [value, setFieldValue]);

            return (
                <Form>
                    <section
                        className={`fixed z-50 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center transition-all ${
                            openWindow?.isOpen
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                        }`}
                    >
                        <div className="w-[35%] h-[90vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#F2F2F2] h-[60px] p-5 flex justify-between">
                                <h2 className="font-bold">
                                    {openWindow?.type === "newMessage"
                                    ? "New Message"
                                    : "Reply Message"}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setOpenWindow({ isOpen: false, type: null })}
                                >
                                    <X size={15} />
                                </button>
                            </div>

                            {/* To & Subject */}
                            <div className="min-h-[100px] w-full px-4 flex flex-col justify-around">
                                <ToInput
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    error={errors.to as string}
                                    touched={touched.to}
                                />

                                <div className={`${ errors.subject && touched.subject ? "border-red-500" : "border-gray-100" } mb-2 border-b flex h-1/2 items-center gap-2`}>
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        {...getFieldProps("subject")}
                                        className={`w-full px-2 py-1`}
                                    />
                                </div>
                                {errors.subject && touched.subject && (
                                    <span className="text-xs text-red-500">{errors.subject}</span>
                                )}
                            </div>

                            {/* Message area */}
                            <div className="flex-1 p-4 flex flex-col gap-5 overflow-auto scrollbar-hide">
                                <textarea
                                    className={`${currentDirBtn?.class} ${leftBtns.isBold && "font-bold"} ${leftBtns.isItalic && "italic"} ${leftBtns.isUnderline && "underline"} w-full scrollbar-hide min-h-[88%] resize-none focus:outline-none`}
                                    value={values.message}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFieldValue("message", val);
                                        debouncedCommit(val);
                                    }}
                                />
                                {errors.message && touched.message && (
                                    <span className="text-xs text-red-500">{errors.message}</span>
                                )}

                                {/* File Uploader */}
                                <div className="flex flex-col items-start gap-2">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        multiple
                                        onChange={(e) => {
                                            const selectedFiles = e.target.files
                                            ? Array.from(e.target.files)
                                            : [];
                                            if (selectedFiles.length === 0) return;

                                            const newPreviews: ImagePreviewItem[] = selectedFiles.map(
                                                (file) => ({
                                                    id: crypto.randomUUID(),
                                                    url: "", 
                                                    file,
                                                })
                                            );

                                            setFilePreviewsFiles((prev) => [...prev, ...newPreviews]);
                                            setFieldValue(
                                                "images",
                                                [...values.files, ...selectedFiles]
                                            );
                                        }}
                                    />

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                                    >
                                        <p className="flex px-5 gap-2 py-2 justify-center items-center">
                                            <Paperclip size={15} /> Attach files
                                        </p>
                                    </div>

                                    {/* Preview */}
                                    {filePreviewsImages.filter((fileItem) => fileItem.file.type.startsWith("image/")).length > 0 && (
                                        <div className=" w-full">
                                            <h3 className="mb-5 pb-2 border-b font-bold border-gray-100">Images</h3>
                                                <div className="flex flex-wrap items-center gap-2 flex-1">
                                                    {filePreviewsImages.map((fileItem) => {
                                                        const isImage = fileItem.file.type.startsWith("image/");
                                                        if(isImage){
                                                            return (
                                                                <div key={fileItem.id} className={`flex relative w-20 items-center overflow-hidden rounded-lg h-fit`} >
                                                                    <img
                                                                        src={URL.createObjectURL(fileItem.file)}
                                                                        alt={fileItem.file.name}
                                                                        className="w-full h-16 object-cover rounded"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className={`${
                                                                        isImage &&
                                                                        "size-full bg-white/20 flex justify-center items-center top-0 right-0 absolute"
                                                                        }`}
                                                                        onClick={() => handleRemoveFile(fileItem.id)}
                                                                    >
                                                                        <X size={15} />
                                                                    </button>
                                                                </div>
                                                            );
                                                        }else{
                                                            return null
                                                        }
                                                    })}
                                                </div>
                                        </div>
                                    )}

                                    {filePreviewsFiles.filter((fileItem) => !fileItem.file.type.startsWith("image/")).length > 0 && (
                                        <div className="w-full">
                                            <h3 className="mb-5 pb-2 w-full border-b font-bold border-gray-100">Files</h3>
                                            <div className="flex flex-wrap items-center gap-2 flex-1">  
                                                {filePreviewsFiles.map((fileItem) => {
                                                    const isImage = fileItem.file.type.startsWith("image/");
                                                    if(!isImage){
                                                        return (
                                                            <div
                                                                key={fileItem.id}
                                                                className={`flex relative items-center overflow-hidden rounded-lg px-5 border-dashed border h-10 gap-2 border-gray-100`}
                                                            >
                                                                <span className="text-sm">{fileItem.file.name}</span>
                                                                <button
                                                                    type="button"
                                                                    className={`${
                                                                    isImage &&
                                                                    "size-full bg-white/20 flex justify-center items-center top-0 right-0 absolute"
                                                                    }`}
                                                                    onClick={() => handleRemoveFile(fileItem.id)}
                                                                >
                                                                    <X size={15} />
                                                                </button>
                                                            </div>
                                                        );
                                                    }else{
                                                        return null
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Editor Buttons */}
                            <EditorBtns
                                setLeftBtns={setLeftBtns}
                                values={values}
                                setFieldValue={setFieldValue}
                                debouncedCommit={debouncedCommit}
                                currentDirBtn={currentDirBtn}
                                setImagePreviews={setFilePreviewsImages}
                                undo={undo}
                                canUndo={canUndo}
                                redo={redo}
                                canRedo={canRedo}
                            />
                        </div>
                    </section>
                </Form>
            );
        }}
        </Formik>
    );
}

import EmojiPicker from "emoji-picker-react";
import { Bold, Image, Italic, List, ListOrdered, Redo, Send, Smile, Underline, Undo, X } from "lucide-react";
import { useCallback, useState } from "react";
import FileUploader from "../../../../common/fileUploader";
import { PopoverDemo } from "../../../../common/popOver";
import type { listState, ImagePreviewItem, ListType, editorBtn } from "../../../../types/msgDetails";

export default function EditorBtns({
    setLeftBtns ,
    values ,
    setFieldValue ,
    debouncedCommit ,
    currentDirBtn ,
    setImagePreviews ,
    undo ,
    canUndo ,
    redo ,
    canRedo
}: editorBtn){
    const [listState, setListState] = useState<listState>({ isNumber: false, isDot: false });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [openFileUploader, setOpenFileUploader] = useState(false);
    /* Lists handling */
    const handleLists = useCallback(
        (type: ListType, message: string, setFieldValue: (field: string, val: string) => void) => {
            const lines = message.split("\n");

            const removeNumbers = (text: string[]) => text.map(line => line.replace(/^\d+\.\s*/, ""));
            const removeDots = (text: string[]) => text.map(line => line.replace(/^•\s*/, ""));
            
            let cleared = lines;
            if (listState.isNumber) cleared = removeNumbers(cleared);
            if (listState.isDot) cleared = removeDots(cleared);

            if (type === "number") {
                const updated = listState.isNumber ? removeNumbers(lines) : cleared.map((l, i) => `${i + 1}. ${l}`);
                setListState({ isNumber: !listState.isNumber, isDot: false });
                const val = updated.join("\n");
                setFieldValue("message", val);
                debouncedCommit(val);
            }

            if (type === "dot") {
                const updated = listState.isDot ? removeDots(lines) : cleared.map(l => `• ${l}`);
                setListState({ isNumber: false, isDot: !listState.isDot });
                const val = updated.join("\n");
                setFieldValue("message", val);
                debouncedCommit(val);
            }
        },
        [listState, debouncedCommit]
    );
    return(
        <div className="h-[120px] px-10 py-3 bg-[#F2F2F2] flex flex-col justify-between">
            <div className="flex justify-between">
                {/* Left */}
                <div className="flex gap-3">
                    <button type="button" onClick={() => setLeftBtns(p => ({ ...p, directionBtn: p.directionBtn === 3 ? 1 : p.directionBtn + 1 }))}>{currentDirBtn?.icon}</button>
                    <button type="button" onClick={() => setLeftBtns(p => ({ ...p, isBold: !p.isBold }))}><Bold /></button>
                    <button type="button" onClick={() => setLeftBtns(p => ({ ...p, isItalic: !p.isItalic }))}><Italic /></button>
                    <button type="button" onClick={() => setLeftBtns(p => ({ ...p, isUnderline: !p.isUnderline }))}><Underline /></button>
                </div>

                {/* Center */}
                <div className="flex gap-3">
                    <button type="button" onClick={undo} disabled={!canUndo}><Undo /></button>
                    <button type="button" onClick={redo} disabled={!canRedo}><Redo /></button>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => handleLists("number", values.message, setFieldValue)}><ListOrdered /></button>
                    <button type="button" onClick={() => handleLists("dot", values.message, setFieldValue)}><List /></button>
                    <PopoverDemo setLink={link => setFieldValue("linkUrl", link)} />

                    <div className="relative">
                    <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{showEmojiPicker ? <X /> : <Smile />}</button>
                    {showEmojiPicker && (
                        <div className="absolute bottom-10 right-0">
                        <EmojiPicker
                            onEmojiClick={e => { const val = values.message + e.emoji; setFieldValue("message", val); debouncedCommit(val); }}
                            lazyLoadEmojis
                        />
                        </div>
                    )}
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpenFileUploader(!openFileUploader)}
                        >
                            {openFileUploader ? <X /> : <Image />}
                        </button>

                        {openFileUploader && (
                            <div className="w-[300px] absolute bottom-10 right-0">
                                <FileUploader
                                    name="files"
                                    title="Image Uploader"
                                    multiple={true} 
                                    onPreview={(files) => {
                                        if (!files || files.length === 0) {
                                            setImagePreviews([]);
                                            setFieldValue("images", []);
                                            return;
                                        }

                                        const previews: ImagePreviewItem[] = files.map(file => ({
                                            id: crypto.randomUUID(),
                                            url: URL.createObjectURL(file),
                                            file,
                                        }));
                                        
                                        setImagePreviews(previews);
                                        setFieldValue("images", files);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button type="submit" className="mt-3 px-5 w-fit py-3 bg-[#FFC107] rounded-xl flex items-center gap-2 font-bold">
                Send now <Send size={16} />
            </button>
        </div>
    )
}
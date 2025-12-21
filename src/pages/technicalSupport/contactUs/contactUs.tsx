import { useState } from "react";



import MsgLayout from "./msgLayout";
import MsgContent from "./msgContent";
import Message from "./components/message";
import type { MsgDetails, windowState } from "../../../types/msgDetails";

export default function ContactUs() {
  const [msgData, setMsgData] = useState<MsgDetails | null>(null);
  const [openWindow, setOpenWindow] = useState<windowState>({
    isOpen: false,
    type: null,
  });


  /* Render */
  return (
    <>
        <main className="flex gap-5 justify-between">
            <MsgLayout
                msgData={msgData}
                setMsgData={setMsgData}
                setOpenWindow={setOpenWindow}
            />
            <MsgContent
                setMsgData={setMsgData}
                msgData={msgData}
                setOpenWindow={setOpenWindow}
            />
        </main>

        <Message openWindow={openWindow} setOpenWindow={setOpenWindow} />
    </>
  );
}

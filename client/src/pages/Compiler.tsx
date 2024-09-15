import { ResizableHandle } from "@/components/ui/resizable"
import { ResizablePanel } from "@/components/ui/resizable"
import { ResizablePanelGroup } from "@/components/ui/resizable"
import axios from "axios"
import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/ui/RenderCode"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateFullCode } from "@/redux/slices/compilerSlice"
import { handleError } from "@/utils/handleError"
import { toast } from "sonner"

export default function Compiler(){
  const {urlId} = useParams();
  const dispatch = useDispatch()
  
  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load", { urlId });
      // console.log(response.data);
      dispatch(updateFullCode(response.data.fullCode)); // Ensure fullCode is the correct field in response
    } 
    catch (error) {
      // console.error("CANNOT FIND CODE");
      if(axios.isAxiosError(error)){
       if(error?.response?.status === 500){
        toast("Invalid URL , Default Code Loaded");
        }
      }
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();  // Call loadCode when urlId is available
    }
  }, [urlId]);  // useEffect dependency on urlId
    return ( 
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
      <HelperHeader />
      <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
    )
}
import { Button } from "./ui/button";
import { Loader2, Share2, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { CompilerSliceStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

import { Code , Copy} from "lucide-react";
export default function HelperHeader() {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);

  const {urlId} = useParams();
  useEffect(()=>{
    if(urlId){
      setShareBtn(true);
    }
    else{
      setShareBtn(false);
    }
  })
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);

  const handleSaveCode = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode,
      });
      console.log(response.data);
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-2">
        <Button
          onClick={handleSaveCode}
          className="flex justify-center items-center gap-1"
          variant="default"
          disabled={saveLoading}
        >
          {saveLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save
            </>
          )}
        </Button>
        {shareBtn && <AlertDialog>
  <AlertDialogTrigger className="flex justify-center items-center gap-1">
          <Share2 size={16} />
          Share
        </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex gap-1 justify-center items-center"><Code />Share your Code!</AlertDialogTitle>
      <AlertDialogDescription className="flex flex-col gap-2">
        <div className="__url flex gap-2">
        <input type="text" disabled className="w-full px-2 py-2 rounded bg-slate-800 text-slate-300 select-none" value={window.location.href}/>
        <Button variant={"secondary"} onClick={()=>{
          window.navigator.clipboard.writeText(window.location.href);
          toast("URL Copied to your clipboard!.");
        }}><Copy size={14}/></Button>

        </div>
        <p className="text-center">Share this URL with your friends to collaborate.</p>
        
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>}
        

       
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small>language:</small>
        <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))}>
          <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue>{currentLanguage}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

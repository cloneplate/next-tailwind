import { Editor } from "../../components/Editor/Editor";

export default function Page() {
  return (
    <div className="">
      {/* <div className="border-b border-slate-200 h-10 flex items-center">
        <span className="font-bold text-sm px-3">Write Now</span>
      </div> */}
      <div className="min-h-[100vh] max-w-[1080px] mx-auto p-4 lg:p-0">
        <Editor />
      </div>
    </div>
  )
}
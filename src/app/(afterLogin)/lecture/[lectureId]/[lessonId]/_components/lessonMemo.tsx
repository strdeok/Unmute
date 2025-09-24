export default function LessonMemo() {
    
  return <textarea onBlur={()=>{
    console.log("blur");
  }} className="w-full h-full border border-[#757575] rounded-lg p-2 resize-none" />;
}

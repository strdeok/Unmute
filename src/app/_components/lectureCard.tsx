import Link from "next/link"

export default function LectureCard({lecture}:{lecture:{
    title: string,
    info: string
}}){
    return(
        <Link href={`/lecture/${lecture.title}`} key={lecture.title}>
            <div id="fake-thumbnail" className="w-full h-32 bg-gray-300" />
            <span className="mt-4 block font-medium">{lecture.title}</span>
            <p className="text-sm text-[#737373]">{lecture.info}</p>
          </Link>
    )
}
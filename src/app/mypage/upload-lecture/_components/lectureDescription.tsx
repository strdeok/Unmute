"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function LectureDescription() {
  const [description, setDescription] = useState("");
  return (
    <div>
      <input
        type="text"
        className="hidden"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <MDEditor
        value={description}
        onChange={(value) => setDescription(value ?? "")}
        // preview="preview"
        // hideToolbar TODO: 추후 강의 상세 페이지에서 속성 적용
        textareaProps={{
          placeholder:
            "강의에 대한 자세한 설명을 입력해주세요. 강의 소개, 강의 대상, 커리큘럼을 포함하면 좋습니다.",
        }}
      />
    </div>
  );
}

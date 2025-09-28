"use client";

import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

interface LectureDescriptionProps {
  previewDescription?: string;
  defaultValue?: string;
}

export default function LectureDescription({
  previewDescription,
  defaultValue,
}: LectureDescriptionProps) {
  const [description, setDescription] = useState(defaultValue ?? "");

  useEffect(() => {
    if (previewDescription !== undefined) {
      setDescription(previewDescription);
    }
  }, [previewDescription]);

  const isPreviewMode = previewDescription !== undefined;

  if (isPreviewMode) {
    return (
      <MDEditor.Markdown
        source={previewDescription}
        style={{ background: "none" }}
      />
    );
  }

  return (
    <>
      <textarea
        name="description"
        value={description}
        className="hidden"
        readOnly
      />
      <MDEditor
        value={description}
        onChange={(value) => setDescription(value ?? "")}
        textareaProps={{
          placeholder:
            "강의에 대한 자세한 설명을 입력해주세요. 강의 소개, 강의 대상, 커리큘럼을 포함하면 좋습니다.",
        }}
      />
    </>
  );
}

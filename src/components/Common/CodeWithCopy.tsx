"use client";

import Prism from "prismjs";
import { useEffect } from "react";

const CodeWithCopy = ({ code }: any) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre
      className={`relative language-${
        code?.language ? code?.language : "html"
      }`}
      data-language={code?.language || ""}
    >
      <code className={`language-${code?.language ? code?.language : "html"}`}>
        {code?.code}
      </code>
    </pre>
  );
};

export default CodeWithCopy;

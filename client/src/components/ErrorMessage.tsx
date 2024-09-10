import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className=" text-right text-xs text-red-600 p-3">
      <svg
        data-slot="icon"
        fill="none"
        strokeWidth="2.0"
        stroke="red"
        viewBox="0 0 24 24"
        className="w-4 h-4 mr-1 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        ></path>
      </svg>
      {children}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";

export default function LinksComponent({ links }: { links: any }) {
  const linkClick = (e: any) => {
    e.stopPropagation();
    console.log("Link Clicked");
  };
  return (
    <>
      {links?.map((link: any) => (
        <div
          className="mt-5 flex w-full flex-col items-center gap-3 px-2"
          key={link?.id}
        >
          <div className="relative flex h-12 w-full items-center justify-center rounded-lg border bg-[#171717] hover:scale-[1.02]">
            <Link
              href={link?.url}
              target="_blank"
              className="flex h-full w-full items-center justify-center text-center"
            >
              {link?.title}
            </Link>
            <div
              className="absolute right-2 z-10 rounded-md p-[6px] hover:bg-muted"
              onClick={linkClick}
              key={link?.id}
            >
              <EllipsisVertical size={20} className="" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import { EllipsisVertical } from "lucide-react";

// export default function LinksComponent({ links }: { links: any }) {
//   const linkClick = (e: any) => {
//     e.stopPropagation();
//     console.log("Link Clicked");
//   };
//   return (
//     <div className="mt-5 flex w-full flex-col items-center gap-3 px-2">
//       {links?.map((link: any) => (
//         <>
//           <Link
//             href={link?.url}
//             target="_blank"
//             rel="noreferrer"
//             key={link?.id}
//             className=" relative flex h-12 w-full items-center justify-center rounded-lg border bg-[#171717] text-center hover:scale-[1.02]"
//           >
//             <span className="rounded-md px-2 py-1">{link?.title || ""}</span>
//             <div
//               className="absolute right-2 rounded-md p-1 hover:bg-muted z-10"
//               onClick={linkClick}
//             >
//               <EllipsisVertical size={20} className="" />
//             </div>
//           </Link>
//         </>
//       ))}
//     </div>
//   );
// }

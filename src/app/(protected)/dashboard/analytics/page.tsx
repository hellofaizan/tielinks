import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import ViewsByBrowserComp from "./components/viewsbybrowser";
import ViewsByDeviceComp from "./components/viewsbydevice";
import ViewsByOSComp from "./components/viewsbyos";
import {
  ViewsByBrowser,
  ViewsByCountry,
  ViewsByDevice,
  ViewsByOS,
  ViewsByReferrer,
} from "~/actions/getAnalytics";

export default async function page() {
  const browser = await ViewsByBrowser();
  const device = await ViewsByDevice();
  const os = await ViewsByOS();
  const country = await ViewsByCountry();
  const referral = await ViewsByReferrer();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div>
        {/* gif load */}
        <div className="h-ful flex w-full items-center justify-center p-2">
          <div className="grid min-h-[300px] w-full grid-cols-1 gap-2 md:grid-cols-3">
            <ViewsByBrowserComp data={browser} />
            <ViewsByDeviceComp data={device} />
            <ViewsByOSComp data={os} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

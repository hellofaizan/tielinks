"use client";

import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { ToggleEmailCollect } from "~/actions/toggleemailcollect";
import { Switch } from "~/components/ui/switch";

export default function OnOffswitch({ enabled, id }: any) {
  const [switchChecked, setChecked] = React.useState(enabled);
  const [loading, setLoading] = React.useState(false);

  const handleChange = async () => {
    setLoading(true);

    ToggleEmailCollect({ id, enabled: !switchChecked }).then((res) => {
      if (res && res.error) {
        toast.error(res.error);
      } else {
        toast.success("Email Collection  " + (switchChecked ? "Disabled" : "Enabled"));
        setChecked(!switchChecked);
      }
      setLoading(false);
    });
  };
  return (
    <>
      {loading ? (
        <Loader size={24} className="animate-spin" />
      ) : (
        <Switch checked={switchChecked} onClick={handleChange} />
      )}
    </>
  );
}

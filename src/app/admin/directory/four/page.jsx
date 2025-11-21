import CRMStructure from "@/modules/admin/directory/components/CRMStructure";
import ParsingRules from "@/modules/admin/directory/components/ParsingRules";
import TemplateEdit from "@/modules/admin/directory/components/TemplateEdit";
import React from "react";

export default function FourPage() {
  return (
    <div>
      <TemplateEdit />
      <ParsingRules />
      <CRMStructure />
    </div>
  );
}

import { FinancialSettings } from "@/modules/admin/organizations";
import HeaderOrganizations from "@/modules/admin/organizations/components/detail/HeaderOrganizations";
import s from "@/modules/admin/organizations/styles/OrganizationsDetail.module.scss";

export default function FinancialSettingsPage() {
  return (
    <div className={s.main}>
      <HeaderOrganizations />
      <FinancialSettings />
    </div>
  );
}


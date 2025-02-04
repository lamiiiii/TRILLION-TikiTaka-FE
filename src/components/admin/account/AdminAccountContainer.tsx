import { useState } from "react";
import AccountFilter from "./AccountFilter";
import AccountList from "./AccountList";

export default function AdminAccountContainer() {
  const [selectedTab, setSelectedTab] = useState<"승인 대기" | "계정 목록">("승인 대기");

  return (
    <div className="flex flex-col max-w-1200">
      <AccountFilter onFilterChange={setSelectedTab} />
      <div>
        <AccountList selectedTab={selectedTab} />
      </div>
    </div>
  );
}

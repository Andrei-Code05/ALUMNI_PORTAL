import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, BarChart2, BadgeCheck } from "lucide-react";

const STAT_CARDS = [
  { label: "Engagement Rate", value: "5,423", sub: "This month", icon: BarChart2 },
  { label: "Active Users", value: "1,893", sub: "This month", icon: Users },
  { label: "Certification Completed", value: "189", sub: "This month", icon: BadgeCheck },
];

const MOCK_ACTIVE_USERS = [
  { name: "Mark Zuckerberg", company: "Facebook", phone: "(63) 994-555-0118", email: "markZ@fb.com", country: "United States", status: "ACTIVE" },
  { name: "Floyd Miles", company: "Yahoo", phone: "(63) 975-666-0100", email: "floyd@yahoo.com", country: "UK", status: "INACTIVE" },
  { name: "Ronald Richards", company: "Adobe", phone: "(63) 957-555-0107", email: "ronald@adobe.com", country: "Israel", status: "INACTIVE" },
  { name: "Marvin McKinney", company: "Tesla", phone: "(63) 974-555-0126", email: "marvin@tesla.com", country: "Iran", status: "ACTIVE" },
  { name: "Jerome Bell", company: "Google", phone: "(63) 938-555-0129", email: "jerome@google.com", country: "Japan", status: "ACTIVE" },
];

const MOCK_ENGAGEMENT = [
  { name: "Tyson Ngo", email: "tyson@gmail.com", appliedDate: "30 Jun 2024", department: "ML Intern", engagementRate: "40%" },
  { name: "Jason Susanto", email: "jsPRX@gmail.com", appliedDate: "30 Jun 2024", department: "ML Intern", engagementRate: "89%" },
];

const MOCK_CERTIFICATIONS = [
  { id: 1, name: "Aspas", email: "aspas@gmail.com", appliedDate: "30 Jun 2024", category: "Web Dev", completed: 0 },
  { id: 2, name: "PatMen", email: "GEPatment@gmail.com", appliedDate: "30 Jun 2024", category: "QA", completed: 0 },
  { id: 3, name: "Zach", email: "zekken@gmail.com", appliedDate: "30 Jun 2024", category: "SA", completed: 0 },
];

function parsePercent(value) {
  if (value === null || value === undefined) return 0;
  const s = String(value).trim();
  const num = Number(s.replace("%", ""));
  return Number.isFinite(num) ? num : 0;
}

function getEngagementStatus(rateValue) {
  const rate = parsePercent(rateValue);
  return rate >= 50 ? "ACTIVE" : "LOW ENGAGEMENT";
}

function StatusPill({ value }) {
  const norm = String(value || "").toUpperCase();

  const isGreen = norm === "ACTIVE" || norm === "COMPLETED" || norm === "YES";

  const classes = isGreen
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-red-50 text-red-700 border-red-200";

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${classes}`}>
      {value}
    </span>
  );
}

function StatCard({ label, value, sub, Icon }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4">
      <div className="h-11 w-11 rounded-full bg-gray-100 flex items-center justify-center">
        {Icon ? <Icon size={20} /> : <div className="h-5 w-5 bg-gray-300 rounded" />}
      </div>

      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-xl font-bold text-gray-900 leading-tight">{value}</div>
        <div className="text-xs text-green-600">{sub}</div>
      </div>
    </div>
  );
}

export default function AnalyticsAndReport() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("activeUsers");
  const [query, setQuery] = useState("");

  const [certRows, setCertRows] = useState(MOCK_CERTIFICATIONS);

  const tableTitle =
    tab === "activeUsers"
      ? "All Active Users"
      : tab === "engagement"
      ? "Recent applicants"
      : "Certifications";

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (tab === "activeUsers") {
      return MOCK_ACTIVE_USERS.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.company.toLowerCase().includes(q) ||
          x.email.toLowerCase().includes(q)
      );
    }

    if (tab === "engagement") {
      return MOCK_ENGAGEMENT
        .map((x) => ({ ...x, status: getEngagementStatus(x.engagementRate) }))
        .filter(
          (x) =>
            x.name.toLowerCase().includes(q) ||
            x.email.toLowerCase().includes(q) ||
            x.department.toLowerCase().includes(q) ||
            String(x.engagementRate).toLowerCase().includes(q) ||
            String(x.status).toLowerCase().includes(q)
        );
    }

    return certRows.filter(
      (x) =>
        x.name.toLowerCase().includes(q) ||
        x.email.toLowerCase().includes(q) ||
        x.category.toLowerCase().includes(q) ||
        String(x.completed).toLowerCase().includes(q)
    );
  }, [query, tab, certRows]);

  const handleCertCategoryChange = (id, nextCategory) => {
    setCertRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, category: nextCategory } : r))
    );
  };

  const handleCertCompletedChange = (id, nextValue) => {
    const cleaned = nextValue === "" ? "" : Math.max(0, Number(nextValue || 0));
    setCertRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: cleaned } : r))
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
        <div className="text-sm text-gray-500">
          Dashboard / Admin Management / Analytics & Report /
          <span className="text-amber-600 font-semibold">
            {" "}
            {tab === "activeUsers"
              ? "Active Users"
              : tab === "engagement"
              ? "Engagement Rate"
              : "Certifications"}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {STAT_CARDS.map((c) => (
          <StatCard key={c.label} label={c.label} value={c.value} sub={c.sub} Icon={c.icon} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setTab("activeUsers")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
            tab === "activeUsers"
              ? "bg-[#C7A600] text-white border-[#C7A600]"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Active Users
        </button>

        <button
          onClick={() => setTab("engagement")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
            tab === "engagement"
              ? "bg-[#C7A600] text-white border-[#C7A600]"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Engagement Rate
        </button>

        <button
          onClick={() => setTab("certifications")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
            tab === "certifications"
              ? "bg-[#C7A600] text-white border-[#C7A600]"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Certifications
        </button>
      </div>

      <div className="mt-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-gray-900">{tableTitle}</div>
            {tab === "activeUsers" && <div className="text-sm text-emerald-600">Active Members</div>}
          </div>

          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-72 max-w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
            />
            <button className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {tab === "activeUsers" && (
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-t border-b border-gray-200">
                <tr>
                  <th className="text-left font-semibold px-6 py-3">Customer Name</th>
                  <th className="text-left font-semibold px-6 py-3">Company</th>
                  <th className="text-left font-semibold px-6 py-3">Phone Number</th>
                  <th className="text-left font-semibold px-6 py-3">Email</th>
                  <th className="text-left font-semibold px-6 py-3">Country</th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((u) => (
                  <tr key={u.email} className="border-b border-gray-100">
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.company}</td>
                    <td className="px-6 py-4">{u.phone}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.country}</td>
                    <td className="px-6 py-4">
                      <StatusPill value={u.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "engagement" && (
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-t border-b border-gray-200">
                <tr>
                  <th className="text-left font-semibold px-6 py-3">Name</th>
                  <th className="text-left font-semibold px-6 py-3">Email ID</th>
                  <th className="text-left font-semibold px-6 py-3">Applied Date</th>
                  <th className="text-left font-semibold px-6 py-3">Department</th>
                  <th className="text-left font-semibold px-6 py-3">Engagement Rate</th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((u) => (
                  <tr key={`${u.email}-${u.appliedDate}`} className="border-b border-gray-100">
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.appliedDate}</td>
                    <td className="px-6 py-4">{u.department}</td>
                    <td className="px-6 py-4">{u.engagementRate}</td>
                    <td className="px-6 py-4">
                      <StatusPill value={u.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "certifications" && (
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-t border-b border-gray-200">
                <tr>
                  <th className="text-left font-semibold px-6 py-3">Name</th>
                  <th className="text-left font-semibold px-6 py-3">Email ID</th>
                  <th className="text-left font-semibold px-6 py-3">Applied Date</th>
                  <th className="text-left font-semibold px-6 py-3">Certification Category</th>
                  <th className="text-left font-semibold px-6 py-3">Certification Completed</th>
                  <th className="text-left font-semibold px-6 py-3">Credentials</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100">
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.appliedDate}</td>

                    <td className="px-6 py-4">
                      <select
                        value={u.category}
                        onChange={(e) => handleCertCategoryChange(u.id, e.target.value)}
                        className="w-44 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                      >
                        <option value="Web Dev">Web Dev</option>
                        <option value="QA">QA</option>
                        <option value="SA">SA</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={u.completed}
                        onChange={(e) => handleCertCompletedChange(u.id, e.target.value)}
                        className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/analytics-and-report/certifications/${u.id}`)
                        }
                        className="px-6 py-2 text-xs rounded-lg bg-[#C7A600] text-white hover:opacity-90"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing 1 to {filteredData.length} of {filteredData.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs rounded bg-[#C7A600] text-white">FIRST</button>
            <button className="px-3 py-2 text-xs rounded border border-gray-200">{"<"}</button>
            <button className="px-3 py-2 text-xs rounded border border-gray-200">1</button>
            <button className="px-3 py-2 text-xs rounded border border-gray-200">{">"}</button>
            <button className="px-4 py-2 text-xs rounded bg-[#C7A600] text-white">LAST</button>
          </div>
        </div>
      </div>
    </div>
  );
}

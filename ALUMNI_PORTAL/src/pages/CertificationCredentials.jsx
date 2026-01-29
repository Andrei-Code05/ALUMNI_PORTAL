import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";

const MOCK_CERTIFICATIONS = [
  { id: 1, name: "Aspas", email: "aspas@gmail.com", appliedDate: "30 Jun 2024", category: "Web Dev", completed: 0 },
  { id: 2, name: "PatMen", email: "GEPatment@gmail.com", appliedDate: "30 Jun 2024", category: "QA", completed: 0 },
  { id: 3, name: "Zach", email: "zekken@gmail.com", appliedDate: "30 Jun 2024", category: "SA", completed: 0 },
];

const MOCK_CREDENTIALS_BY_EMAIL = {
  "aspas@gmail.com": [
    { title: "JavaScript", issuer: "FreeCodeCamp", date: "Jun 2024", desc: "Fundamentals + DOM + ES6" },
    { title: "React", issuer: "Meta", date: "Jul 2024", desc: "Components, Hooks, SPA basics" },
    { title: "Git & GitHub", issuer: "Coursera", date: "Aug 2024", desc: "Version control workflow" },
  ],
  "GEPatment@gmail.com": [
    { title: "Software Testing", issuer: "ISTQB", date: "May 2024", desc: "Testing basics, test design" },
    { title: "API Testing", issuer: "Postman", date: "Jun 2024", desc: "Collections, environments" },
  ],
  "zekken@gmail.com": [
    { title: "Systems Analysis", issuer: "Google", date: "Apr 2024", desc: "Requirements, modeling" },
    { title: "UML Basics", issuer: "Coursera", date: "May 2024", desc: "Use case, activity diagrams" },
  ],
};

function Avatar({ name }) {
  const initials = (name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
      {initials || "U"}
    </div>
  );
}

export default function CertificationCredentials() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");

  const person = useMemo(() => {
    const numId = Number(id);
    return MOCK_CERTIFICATIONS.find((x) => x.id === numId) || null;
  }, [id]);

  const creds = useMemo(() => {
    if (!person?.email) return [];
    return MOCK_CREDENTIALS_BY_EMAIL[person.email] || [];
  }, [person]);

  const filteredCreds = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return creds;

    return creds.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.date.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q)
    );
  }, [creds, search]);

  if (!person) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate("/analytics-and-report")}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Back
        </button>

        <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-lg font-bold text-gray-900">Applicant not found</div>
          <div className="text-sm text-gray-500">Invalid certification id.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* breadcrumb header */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm flex items-center justify-between gap-3">
        <div className="text-sm text-gray-500">
          Dashboard/Admin Management/Analytics & Report/Certifications/
          <span className="text-[#C7A600] font-semibold"> Credential</span>
        </div>

        {/* ✅ keep only this back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* content grid */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* left profile card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#C7A600]/25 to-gray-50" />
            <div className="p-5">
              <div className="-mt-12 flex items-end justify-between">
                <Avatar name={person.name} />
                <span className="text-xs px-3 py-1 rounded-full border bg-green-50 text-green-700 border-green-200 font-semibold">
                  ACTIVE
                </span>
              </div>

              <div className="mt-3">
                <div className="text-sm font-bold text-gray-900">{person.name}</div>
                <div className="text-xs text-gray-500">{person.email}</div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-500">Applied Date</span>
                  <span className="font-medium">{person.appliedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium">{person.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Completed</span>
                  <span className="font-medium">{String(person.completed)}</span>
                </div>
              </div>

              <button className="mt-4 w-full text-xs py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                View profile
              </button>
            </div>
          </div>
        </div>

        {/* right certifications list */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="text-lg font-bold text-gray-900">Certifications</div>

              <div className="relative w-full md:w-80">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gray-200 overflow-hidden">
              <div className="max-h-[560px] overflow-y-auto">
                {filteredCreds.length === 0 ? (
                  <div className="p-6 text-sm text-gray-500">No credentials found.</div>
                ) : (
                  filteredCreds.map((c, idx) => (
                    <div
                      key={`${c.title}-${idx}`}
                      className={`p-4 flex gap-4 ${
                        idx !== filteredCreds.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <div className="h-14 w-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                        CERT
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-gray-900 text-sm">{c.title}</div>
                          <div className="text-xs text-gray-500">{c.date}</div>
                        </div>
                        <div className="text-xs text-gray-500">{c.issuer}</div>
                        <div className="text-xs text-gray-600 mt-1">{c.desc}</div>
                      </div>

                      {/* ✅ removed View button */}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ✅ removed bottom Back + Download buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}

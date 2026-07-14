import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, MapPin } from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";

const projectTabs = ["Все проекты", "Резиденция ЛЮКСОР", "Родная гавань", "Фантастик"];
const roomOptions = ["Студия", "1к", "2к", "3к", "4к"];
const deadlineOptions = ["Любой", "Сдан", "2026", "2027", "2028"];

/* Standalone view toggle for use in SectionHeading */
const ViewToggle = ({ view = "params", onViewChange }: { view?: "params" | "map", onViewChange?: (v: "params" | "map") => void }) => {
  const [internalView, setInternalView] = useState<"params" | "map">(view);
  const currentView = onViewChange ? view : internalView;
  
  const handleChange = (v: "params" | "map") => {
    setInternalView(v);
    onViewChange?.(v);
  };

  return (
    <div className="flex gap-1.5">
      <button
        onClick={() => handleChange("params")}
        title="По параметрам"
        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-colors ${
          currentView === "params"
            ? "bg-foreground text-background border-foreground"
            : "btn-interactive btn-outline border-border bg-transparent text-foreground"
        }`}
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleChange("map")}
        title="На карте"
        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-colors ${
          currentView === "map"
            ? "bg-foreground text-background border-foreground"
            : "btn-interactive btn-outline border-border bg-transparent text-foreground"
        }`}
      >
        <MapPin className="h-4 w-4" />
      </button>
    </div>
  );
};

export interface FilterValues {
  project: string;
  rooms: string[];
  deadline: string;
}

const ProjectsFilter = ({
  hideViewToggle = false,
  onFilterChange,
}: {
  hideViewToggle?: boolean;
  onFilterChange?: (params: string, filters: FilterValues) => void;
}) => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState("Все проекты");
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedDeadline, setSelectedDeadline] = useState("Любой");

  const buildParams = (project: string, rooms: string[], deadline: string) => {
    const p = new URLSearchParams();
    if (project !== "Все проекты") p.set("project", project);
    if (rooms.length) p.set("rooms", rooms.map(r => r.replace("к", "")).join(","));
    if (deadline !== "Любой") p.set("deadline", deadline);
    return p.toString();
  };

  const emitFilterChange = (project: string, rooms: string[], deadline: string) => {
    onFilterChange?.(buildParams(project, rooms, deadline), { project, rooms, deadline });
  };

  const handleProjectSelect = (tab: string) => {
    setSelectedProject(tab);
    emitFilterChange(tab, selectedRooms, selectedDeadline);
  };

  const handleRoomToggle = (r: string) => {
    const next = selectedRooms.includes(r)
      ? selectedRooms.filter((x) => x !== r)
      : [...selectedRooms, r];
    setSelectedRooms(next);
    emitFilterChange(selectedProject, next, selectedDeadline);
  };

  const handleDeadlineChange = (d: string) => {
    setSelectedDeadline(d);
    emitFilterChange(selectedProject, selectedRooms, d);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Filter row */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
        {/* Project — tabs */}
        <div>
          <p className="text-muted-foreground text-xs mb-2">Проект</p>
          <div className="flex gap-1 flex-wrap">
            {projectTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleProjectSelect(tab)}
                className={`h-12 px-5 rounded-pill text-sm font-medium transition-colors border ${
                  selectedProject === tab
                    ? "bg-foreground text-background border-foreground"
                    : "btn-interactive btn-outline border-border bg-transparent text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline — hidden on mobile */}
        <div className="hidden md:block">
          <p className="text-muted-foreground text-xs mb-2">Готовность</p>
          <FilterDropdown
            value={selectedDeadline}
            options={deadlineOptions}
            onChange={handleDeadlineChange}
            height="h-12"
          />
        </div>

        {/* Rooms */}
        <div className="mb-2 md:mb-0">
          <p className="text-muted-foreground text-xs mb-2">Комнат</p>
          <div className="flex gap-1">
            {roomOptions.map((r) => (
              <button
                key={r}
                onClick={() => handleRoomToggle(r)}
                className={`min-w-[44px] h-12 px-3 rounded-pill text-sm font-medium transition-colors border ${
                  selectedRooms.includes(r)
                    ? "bg-foreground text-background border-foreground"
                    : "btn-interactive btn-outline border-border bg-transparent text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* CTA — always navigates to catalog */}
        <button
          onClick={() => {
            const params = buildParams(selectedProject, selectedRooms, selectedDeadline);
            navigate(`/catalog${params ? `?${params}` : ""}`);
          }}
          className="btn-yellow btn-interactive w-full md:w-auto rounded-pill h-12 px-8 text-sm font-medium uppercase tracking-wide whitespace-nowrap"
        >
          Показать квартиры <span className="ml-2 font-bold">804</span>
        </button>
      </div>
    </motion.div>
  );
};

ProjectsFilter.ViewToggle = ViewToggle;

export default ProjectsFilter as typeof ProjectsFilter & { ViewToggle: typeof ViewToggle };

import { Badge } from "@/components/ui/badge";
import { Shield, Edit, Eye } from "lucide-react";

interface RoleBadgeProps {
  role: "admin" | "data-entry" | "data_entry" | "dataEntry" | "viewer";
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const roleConfig = {
    admin: {
      label: "Administrator",
      icon: Shield,
      variant: "default" as const,
      className: "bg-red-100 text-red-800 hover:bg-red-100",
    },
    "data-entry": {
      label: "Data Entry",
      icon: Edit,
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    },
    viewer: {
      label: "Viewer",
      icon: Eye,
      variant: "outline" as const,
      className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    },
  };

  const normalizedRole =
    role === "data_entry" || role === "dataEntry" ? "data-entry" : role;
  const config = roleConfig[normalizedRole];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} ${className}`}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}

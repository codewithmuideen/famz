// Explicit named imports (rather than `import * as Icons`) so bundlers can
// tree-shake unused lucide-react icons out of the production build.
import {
  UserRound,
  FileSpreadsheet,
  Receipt,
  LineChart,
  Briefcase,
  Sparkles,
  Cpu,
  ShoppingCart,
  Landmark,
  Building2,
  HardHat,
  Stethoscope,
  Store,
  Users,
  GraduationCap,
  LaptopMinimal,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";

export const iconMap = {
  UserRound,
  FileSpreadsheet,
  Receipt,
  LineChart,
  Briefcase,
  Sparkles,
  Cpu,
  ShoppingCart,
  Landmark,
  Building2,
  HardHat,
  Stethoscope,
  Store,
  Users,
  GraduationCap,
  LaptopMinimal,
  TrendingUp,
  HeartHandshake,
};

export const getIcon = (name) => iconMap[name] ?? Briefcase;

export default iconMap;

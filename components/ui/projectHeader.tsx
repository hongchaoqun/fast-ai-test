// app/components/Header.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Menu } from "lucide-react";

interface ProjectHeaderProps {
  onNewButtonClick?: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onNewButtonClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="知识库名称" className="pl-8 w-[300px] max-w-[calc(100vw-120px)]" />
        </div>
      </div>
      <Button className="gap-2" onClick={onNewButtonClick}>
        <Plus className="h-4 w-4" />
        新建
      </Button>
    </header>
  );
};  

export default ProjectHeader;
import { FileIcon, MoreHorizontal, PlusIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DirectoryTable from "@/components/directory/directory-table"

export default function DataTablePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 6H16M8 10H16M8 14H11M6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          文件(1)
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索" className="w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Button className="gap-1 bg-blue-500 hover:bg-blue-600">
            <PlusIcon className="h-4 w-4" />
            新建/导入
          </Button>
        </div>
      </div>

      <DirectoryTable />
    </div>
  )
}


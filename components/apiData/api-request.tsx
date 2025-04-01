import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ApiDetailData } from "@/lib/types";

const ApiRequest = ({ apiData }: {apiData: ApiDetailData}) => {
    return (
        <>
            <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="pt-6">
                    <Tabs defaultValue="params">
                        <TabsList className="mb-4 p-1 bg-muted/50 rounded-full">
                        <TabsTrigger value="params" className="rounded-full">
                            Parameters
                        </TabsTrigger>
                        <TabsTrigger value="headers" className="rounded-full">
                            Headers
                        </TabsTrigger>
                        <TabsTrigger value="body" className="rounded-full">
                            Body
                        </TabsTrigger>
                        </TabsList>
                        <TabsContent value="params" className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                            <Label htmlFor="param-name">Name</Label>
                            <Input id="param-name" placeholder="id" className="border-dashed" />
                            </div>
                            <div className="col-span-2">
                            <Label htmlFor="param-value">Value</Label>
                            <Input id="param-value" placeholder="123" className="border-dashed" />
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">
                            <Plus className="mr-1 h-3.5 w-3.5" />
                            Add Parameter
                        </Button>
                        </TabsContent>
                        <TabsContent value="headers" className="space-y-4">
                        {apiData.headers.map((header, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <Input value={header.key} readOnly className="bg-muted/50" />
                            </div>
                            <div className="col-span-2">
                                <Input value={header.value} className="border-dashed" />
                            </div>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="rounded-full">
                            <Plus className="mr-1 h-3.5 w-3.5" />
                            Add Header
                        </Button>
                        </TabsContent>
                        <TabsContent value="body">
                        <Textarea value={apiData.requestBody} className="min-h-[200px] font-mono border-dashed" />
                        </TabsContent>
                    </Tabs>
                </CardContent>
          </Card>
        </>
    )
}

export default ApiRequest;
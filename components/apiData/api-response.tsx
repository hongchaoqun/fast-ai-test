import { Card, CardContent } from "../ui/card"
import { Textarea } from "../ui/textarea"

const ApiResponse = ({responseStatus, responseTime, responseData}: {
  responseStatus?: string,
  responseTime?: string,
  responseData?: string
}) => {
  return (
    <>
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Response</h3>
                {responseStatus && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      {responseStatus}
                    </div>
                    <div className="text-muted-foreground">{responseTime}</div>
                  </div>
                )}
              </div>
              <Textarea
                value={responseData}
                readOnly
                className="min-h-[350px] font-mono bg-muted/30"
                placeholder="Response will appear here after sending the request"
              />
            </CardContent>
        </Card>
    </>
  )
}

export default ApiResponse
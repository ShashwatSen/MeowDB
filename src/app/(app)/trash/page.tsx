
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trash2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TrashPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Trash</CardTitle>
          <CardDescription>Items in the trash will be automatically and permanently deleted after 30 days.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground p-12">
          <Trash2 className="h-16 w-16" />
          <p>Your trash is empty.</p>
          <p className="text-sm">Deleted items will appear here.</p>
        </CardContent>
      </Card>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Items deleted from the trash are gone forever and cannot be recovered.
        </AlertDescription>
      </Alert>
    </div>
  );
}

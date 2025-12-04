import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Folder } from "lucide-react";

export default function MyFilesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">My Files</CardTitle>
        <CardDescription>This page is under construction. Manage your personal files and uploads here.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground p-12">
        <Folder className="h-16 w-16" />
        <p>Coming soon...</p>
      </CardContent>
    </Card>
  );
}

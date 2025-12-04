import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Bookmarks</CardTitle>
        <CardDescription>Your saved entries for quick access.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground p-12">
        <Bookmark className="h-16 w-16" />
        <p>No bookmarked items yet.</p>
        <p className="text-sm">Use the bookmark icon on the browse page to save entries here.</p>
      </CardContent>
    </Card>
  );
}

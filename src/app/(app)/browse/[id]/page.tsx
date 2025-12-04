import { notFound } from 'next/navigation';
import { getEntryById, getHistoryByEntryId } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GitCommit, PlusCircle, Trash2, Undo2 } from 'lucide-react';
import type { HistoryEvent } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const eventIcons = {
  CREATE: <PlusCircle className="h-5 w-5 text-primary" />,
  UPDATE: <GitCommit className="h-5 w-5 text-blue-400" />,
  DELETE: <Trash2 className="h-5 w-5 text-destructive" />,
  ROLLBACK: <Undo2 className="h-5 w-5 text-yellow-400" />,
};

export default function EntryDetailPage({ params }: { params: { id: string } }) {
  const entry = getEntryById(params.id);
  const history = getHistoryByEntryId(params.id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Button variant="ghost" asChild className="-ml-4 mb-2">
            <Link href="/browse">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Archives
            </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{entry.name}</h1>
        <p className="text-muted-foreground">{entry.description}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <Badge variant="outline" className="font-mono">v{entry.version}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <Badge variant="secondary">{entry.category}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-mono text-muted-foreground">{entry.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Update</span>
              <span>{format(new Date(entry.lastUpdated), "PPp")}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Change History</CardTitle>
            <CardDescription>Timeline of all modifications to this entry.</CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline history={history} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Timeline({ history }: { history: HistoryEvent[] }) {
  if (history.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No history available for this entry.</p>;
  }
  return (
    <div className="relative pl-6">
      {history.map((event, index) => (
        <div key={event.id} className="relative flex items-start gap-6 pb-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border -translate-x-1/2"></div>
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-border -translate-x-1/2"></div>
          
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            {eventIcons[event.type]}
          </div>

          <div className="flex-1 pt-1">
            <p className="text-sm">
                <span className="font-semibold">{event.user.name}</span>
                <span className="text-muted-foreground"> {event.type.toLowerCase()}d this entry</span>
            </p>
            <p className="text-sm text-muted-foreground">{event.details}</p>
            <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

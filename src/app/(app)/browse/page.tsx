
'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { getEntries } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Database, FileText, KeyRound, Users, LayoutGrid, List, Rows, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import type { Entry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';

const categoryIcons: Record<Entry['category'], React.ReactNode> = {
  Databases: <Database className="h-full w-full" />,
  Documents: <FileText className="h-full w-full" />,
  'API Keys': <KeyRound className="h-full w-full" />,
  'Customer Data': <Users className="h-full w-full" />,
};

type ViewType = 'normal' | 'grid' | 'list';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'all';

  const [view, setView] = useState<ViewType>('normal');
  const [gridSize, setGridSize] = useState(2); // 0=small, 1=medium, 2=large

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Archives</h1>
        <p className="text-muted-foreground">
          Browse, search, and manage your versioned data entries.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <FilterControls />
        <div className="flex items-center gap-4">
            <ToggleGroup 
                type="single" 
                value={view} 
                onValueChange={(value) => value && setView(value as ViewType)}
                aria-label="View type"
            >
                <ToggleGroupItem value="normal" aria-label="Normal view">
                    <Rows className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                    <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                    <List className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            {view === 'grid' && (
                <div className="flex items-center gap-3 w-40">
                    <Label htmlFor="grid-size">Size</Label>
                    <Slider
                        id="grid-size"
                        min={0}
                        max={2}
                        step={1}
                        value={[gridSize]}
                        onValueChange={(value) => setGridSize(value[0])}
                    />
                </div>
            )}
        </div>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <DataView query={query} category={category} view={view} gridSize={gridSize} />
      </Suspense>
    </div>
  );
}

function FilterControls() {
  // This could be improved by using a client component with `useRouter` to push state
  return (
    <form method="GET" className="flex flex-1 flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="query"
          placeholder="Search by name or description..."
          className="pl-10"
        />
      </div>
      <div className="flex gap-4">
        <Select name="category">
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Databases">Databases</SelectItem>
            <SelectItem value="Documents">Documents</SelectItem>
            <SelectItem value="API Keys">API Keys</SelectItem>
            <SelectItem value="Customer Data">Customer Data</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

function DataView({ query, category, view, gridSize }: { query: string; category: string, view: ViewType, gridSize: number }) {
  const entries = getEntries(query, category);

  if (entries.length === 0) {
      return (
          <div className="h-24 text-center text-muted-foreground flex items-center justify-center">
              No results found.
          </div>
      );
  }

  if (view === 'grid') {
      return <DataGridView entries={entries} size={gridSize} />;
  }
  
  if (view === 'list') {
      return <DataListView entries={entries} />;
  }

  return <DataTable entries={entries} />;
}


function DataTable({ entries }: { entries: Entry[] }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
            <TableHead className="text-right">Version</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 hidden sm:inline-block text-muted-foreground">
                    {categoryIcons[entry.category]}
                  </div>
                  <Link
                    href={`/browse/${entry.id}`}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {entry.name}
                  </Link>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">{entry.category}</Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {formatDistanceToNow(new Date(entry.lastUpdated), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className="font-mono">v{entry.version}</Badge>
              </TableCell>
              <TableCell>
                <BookmarkToggle />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DataGridView({ entries, size }: { entries: Entry[], size: number }) {
    const sizeClasses = {
        0: { grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6', icon: 'h-12 w-12', text: 'text-xs' }, // Small
        1: { grid: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', icon: 'h-20 w-20', text: 'text-sm' }, // Medium
        2: { grid: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3', icon: 'h-28 w-28', text: 'text-base' }  // Large
    };
    const currentSize = sizeClasses[size as keyof typeof sizeClasses];

    return (
        <div className={cn("grid gap-4", currentSize.grid)}>
            {entries.map(entry => (
                <Card key={entry.id} className="relative group hover:bg-accent hover:text-accent-foreground transition-colors">
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BookmarkToggle />
                    </div>
                    <Link href={`/browse/${entry.id}`} className='h-full'>
                        <CardContent className="flex h-full flex-col items-center justify-center p-6 gap-4 text-center">
                           <div className={cn("text-muted-foreground", currentSize.icon)}>
                             {categoryIcons[entry.category]}
                           </div>
                           <p className={cn("font-semibold leading-tight break-all", currentSize.text)}>{entry.name}</p>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    );
}

function DataListView({ entries }: { entries: Entry[] }) {
    return (
        <div className="border rounded-lg">
            <ul className="divide-y divide-border">
                {entries.map(entry => (
                     <li key={entry.id} className="group flex items-center">
                        <Link href={`/browse/${entry.id}`} className="flex-1 block p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{entry.name}</span>
                                <span className="text-sm text-muted-foreground font-mono">{entry.category}.{entry.name.endsWith('.1') ? 'v2' : 'v1'}{entry.category === 'Documents' ? '.pdf' : '.db'}</span>
                            </div>
                        </Link>
                        <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <BookmarkToggle />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function DataTableSkeleton() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="h-5 w-32" /></TableHead>
            <TableHead className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead className="hidden lg:table-cell"><Skeleton className="h-5 w-28" /></TableHead>
            <TableHead className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 w-48" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-32" /></TableCell>
              <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-36" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function BookmarkToggle() {
    const [bookmarked, setBookmarked] = useState(false);
    return (
        <Toggle
            aria-label="Toggle bookmark"
            size="sm"
            pressed={bookmarked}
            onPressedChange={setBookmarked}
        >
            <Bookmark className={cn("h-4 w-4", bookmarked && "fill-primary text-primary")} />
        </Toggle>
    )
}

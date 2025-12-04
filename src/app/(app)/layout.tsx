
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Archive,
  FileText,
  Upload,
  Settings,
  User,
  PanelLeft,
  Search,
  Bookmark,
  Trash2,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { useHotkeys } from '@/hooks/use-hotkeys';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Kbd } from '@/components/ui/kbd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const shortcuts = [
    { keys: ['G', 'H'], description: 'Go to Home (Browse)' },
    { keys: ['G', 'F'], description: 'Go to My Files' },
    { keys: ['G', 'B'], description: 'Go to Bookmarks' },
    { keys: ['G', 'U'], description: 'Go to Uploads' },
    { keys: ['G', 'T'], description: 'Go to Trash' },
    { keys: ['G', 'A'], description: 'Go to Account' },
    { keys: ['G', 'S'], description: 'Go to Settings' },
    { keys: ['C'], description: 'Create new entry (Upload)' },
    { keys: ['?'], description: 'Show this help menu' },
];


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [showHelp, setShowHelp] = React.useState(false);

  useHotkeys([
    ['g h', () => router.push('/browse')],
    ['g f', () => router.push('/my-files')],
    ['g b', () => router.push('/bookmarks')],
    ['g u', () => router.push('/upload')],
    ['g t', () => router.push('/trash')],
    ['g a', () => router.push('/account')],
    ['g s', () => router.push('/settings')],
    ['c', () => router.push('/upload')],
    ['?', () => setShowHelp(true)],
  ]);


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo className="p-4" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Browse Data Archives (G H)">
                <Link href="/browse">
                  <Archive />
                  <span>Browse</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="View Your Files (G F)">
                <Link href="/my-files">
                  <FileText />
                  <span>My Files</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="View Your Bookmarks (G B)">
                <Link href="/bookmarks">
                  <Bookmark />
                  <span>Bookmarks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Upload New Entry (G U / C)">
                <Link href="/upload">
                  <Upload />
                  <span>Uploads</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="View Trash (G T)">
                <Link href="/trash">
                  <Trash2 />
                  <span>Trash</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Account (G A)">
                  <Link href="/account">
                    <User />
                    <span>Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Application Settings (G S)">
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 h-9" />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowHelp(true)}>
            <Kbd className="text-muted-foreground">?</Kbd>
            <span className="sr-only">Help</span>
          </Button>
        </header>
        <main className="flex-1 p-8 md:p-10">{children}</main>
      </SidebarInset>
      <ShortcutsHelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </SidebarProvider>
  );
}

function ShortcutsHelpDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Keyboard Shortcuts</DialogTitle>
                    <DialogDescription>
                        Use these shortcuts to navigate and perform actions faster.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 mt-4">
                    {shortcuts.map(shortcut => (
                        <div key={shortcut.description} className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{shortcut.description}</p>
                            <div className="flex items-center gap-1">
                                {shortcut.keys.map(key => (
                                    <Kbd key={key}>{key}</Kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

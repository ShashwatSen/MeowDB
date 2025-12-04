
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, Link as LinkIcon, FileUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      // handle files
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      // handle files
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Upload New Entry</CardTitle>
        <CardDescription>Upload a new data entry to the archives from your computer or a web link.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="computer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="computer"><UploadCloud className="mr-2" /> From Computer</TabsTrigger>
            <TabsTrigger value="link"><LinkIcon className="mr-2" /> From Link</TabsTrigger>
          </TabsList>
          <TabsContent value="computer">
            <div className="mt-6">
                <form 
                    className={cn(
                        "grid w-full items-center gap-4 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                        dragActive ? "border-primary bg-accent" : ""
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input type="file" id="file-upload" className="hidden" onChange={handleChange} />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <UploadCloud className="h-12 w-12 text-muted-foreground" />
                            <p className="text-muted-foreground">
                                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">Maximum file size: 50MB</p>
                            {fileName && <p className="mt-2 text-sm font-medium text-foreground">{fileName}</p>}
                        </div>
                    </Label>
                </form>
                <div className="flex justify-start mt-6">
                    <Button>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload File
                    </Button>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="link">
             <div className="mt-6">
                <form className="grid gap-6">
                    <div className="grid w-full max-w-lg items-center gap-2">
                        <Label htmlFor="link-upload">File URL</Label>
                        <Input id="link-upload" type="url" placeholder="https://example.com/data.csv" />
                    </div>
                    <div className="flex justify-start">
                        <Button>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Import from Link
                        </Button>
                    </div>
                </form>
             </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

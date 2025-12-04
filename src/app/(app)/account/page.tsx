import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, RefreshCw, User, Mail, Shield } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
        <p className="text-muted-foreground">
          Manage your account details and generate API keys.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                <User className="mr-2 inline-block h-4 w-4" />
                Full Name
              </Label>
              <Input id="name" defaultValue="Alex Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                <Mail className="mr-2 inline-block h-4 w-4" />
                Email
              </Label>
              <Input id="email" type="email" defaultValue="alex.doe@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                <Shield className="mr-2 inline-block h-4 w-4" />
                Password
              </Label>
              <Input id="password" type="password" placeholder="Enter new password to update" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Account</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>Generate and manage your API access key.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">
                <KeyRound className="mr-2 inline-block h-4 w-4" />
                Your API Key
              </Label>
              <Input id="api-key" readOnly value="********************************" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate Key
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

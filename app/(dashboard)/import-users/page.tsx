import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImportUsersPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Import Users</CardTitle>
          <CardDescription>This migration utility is no longer required.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          User management is handled in the dashboard via Better Auth admin actions.
        </CardContent>
      </Card>
    </div>
  );
}

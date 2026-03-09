import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataImportPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Data Import</CardTitle>
          <CardDescription>
            This legacy local-storage migration screen has been retired.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          CSV import is available directly from each dataset page via the import dialog.
        </CardContent>
      </Card>
    </div>
  );
}

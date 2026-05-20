import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export function LoansTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Loans</h2>
          <p className="text-muted-foreground mt-1">
            Borrow against your crypto assets at low rates.
          </p>
        </div>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          New Loan
        </Button>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Total Borrowed
            </p>
            <p className="text-3xl font-bold">$14,500.00</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Available Credit
            </p>
            <p className="text-3xl font-bold text-primary">$12,500.00</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 relative overflow-hidden">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Health Factor
            </p>

            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-green-500">1.85</p>
              <span className="text-sm text-green-500 mb-1">Safe</span>
            </div>

            <div className="mt-4 w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-green-500 shadow-md transform -translate-x-1/2"
                style={{ left: "85%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-card border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Collateralized Loan</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current LTV
                  </span>

                  <span className="text-sm font-bold text-accent">65%</span>
                </div>

                <Progress value={65} className="h-2 bg-muted/30" />
              </div>

              <div className="pt-4 border-t border-border/50 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Interest Rate (APY)
                  </span>

                  <span className="text-sm font-medium">4.2%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Available Credit
                  </span>

                  <span className="text-sm font-medium text-primary">
                    $12,500
                  </span>
                </div>
              </div>

              <Button className="w-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                Borrow More
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Active Loans</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Collateral</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Pool "Buy a House"
                      </TableCell>

                      <TableCell>$10,000</TableCell>
                      <TableCell>4.2%</TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                        >
                          Healthy
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          Repay
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">
                        Pool "Buy a Car"
                      </TableCell>

                      <TableCell>$4,500</TableCell>
                      <TableCell>4.5%</TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                        >
                          Healthy
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          Repay
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

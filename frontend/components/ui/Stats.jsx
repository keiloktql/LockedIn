import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const Stats = ({ title, icon, data }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <h2 className="text-2xl font-bold">{data}</h2>
    </CardContent>
  </Card>
);

export default Stats;

import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useDebounce } from '../hooks/use-debounce';
import { Download, Filter } from 'lucide-react';

const salesData = [
  { name: 'Gen', value: 400, deals: 5 },
  { name: 'Feb', value: 300, deals: 3 },
  { name: 'Mar', value: 600, deals: 7 },
  { name: 'Apr', value: 800, deals: 9 },
  { name: 'Mag', value: 500, deals: 6 },
  { name: 'Giu', value: 700, deals: 8 },
];

const leadSourceData = [
  { name: 'Referral', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Website', value: 300 },
  { name: 'Direct', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('6m');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleExport = (format) => {
    // In una implementazione reale, qui genereremmo il file nel formato richiesto
    const timestamp = new Date().toISOString().split('T')[0];
    alert(`Report esportato in formato ${format} - ${timestamp}`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Ultimo mese</SelectItem>
              <SelectItem value="3m">Ultimi 3 mesi</SelectItem>
              <SelectItem value="6m">Ultimi 6 mesi</SelectItem>
              <SelectItem value="1y">Ultimo anno</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </Button>
          <Select defaultValue="pdf">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Esporta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf" onClick={() => handleExport('PDF')}>PDF</SelectItem>
              <SelectItem value="excel" onClick={() => handleExport('Excel')}>Excel</SelectItem>
              <SelectItem value="csv" onClick={() => handleExport('CSV')}>CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Fatturato Totale</h3>
          <p className="text-2xl md:text-3xl font-bold">€234.500</p>
          <p className="text-sm text-muted-foreground mt-2">+15% rispetto al periodo precedente</p>
        </Card>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Lead Qualificati</h3>
          <p className="text-2xl md:text-3xl font-bold">45</p>
          <p className="text-sm text-muted-foreground mt-2">+5% rispetto al periodo precedente</p>
        </Card>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Tasso di Conversione</h3>
          <p className="text-2xl md:text-3xl font-bold">23%</p>
          <p className="text-sm text-muted-foreground mt-2">+2% rispetto al periodo precedente</p>
        </Card>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Clienti Attivi</h3>
          <p className="text-2xl md:text-3xl font-bold">89</p>
          <p className="text-sm text-muted-foreground mt-2">+8% rispetto al periodo precedente</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4">Andamento Vendite</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Fatturato (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4">Trattative Chiuse</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="deals" 
                  fill="hsl(var(--primary))"
                  name="Numero trattative"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4">Origine Lead</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4">KPI Principali</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tempo medio di chiusura</span>
              <span className="font-medium">45 giorni</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Valore medio trattativa</span>
              <span className="font-medium">€15.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Lead qualificati/totali</span>
              <span className="font-medium">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tasso di rinnovo</span>
              <span className="font-medium">85%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
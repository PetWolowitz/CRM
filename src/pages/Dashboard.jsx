import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useDebounce } from '../hooks/use-debounce';

const data = [
  { name: 'Gen', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'Mag', value: 500 },
  { name: 'Giu', value: 700 },
];

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <Input
          type="search"
          placeholder="Cerca..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Contatti Totali</h3>
          <p className="text-2xl md:text-3xl font-bold">1,234</p>
        </Card>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Trattative Aperte</h3>
          <p className="text-2xl md:text-3xl font-bold">45</p>
        </Card>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-2 md:mb-4">Clienti Acquisiti</h3>
          <p className="text-2xl md:text-3xl font-bold">89</p>
        </Card>
      </div>

      <Card className="p-4 md:p-6">
        <h3 className="font-semibold mb-4">Andamento Contatti</h3>
        <div className="h-[250px] md:h-[300px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, CheckCircle2, Calendar, User, ChevronDown, ChevronRight } from 'lucide-react';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { ContentCard } from '@/components/ui/shared/ContentCard';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mockTasks = [
  {
    id: '1',
    title: 'Follow-up cliente Acme Corp',
    description: 'Chiamare per feedback sulla proposta',
    dueDate: new Date('2024-03-25'),
    status: 'pending',
    priority: 'high',
    assignedTo: 'Mario Rossi',
  },
  {
    id: '2',
    title: 'Preparare presentazione',
    description: 'Slides per nuovo cliente',
    dueDate: new Date('2024-03-28'),
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Luigi Verdi',
  },
  {
    id: '3',
    title: 'Review documentazione',
    description: 'Completata review della documentazione tecnica',
    dueDate: new Date('2024-03-20'),
    status: 'completed',
    priority: 'low',
    assignedTo: 'Mario Rossi',
    completedAt: new Date('2024-03-20'),
  },
];

export function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(true);
  const { toast } = useToast();

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
    setIsDeleteDialogOpen(false);
    setSelectedTask(null);
    toast({
      title: "Attività eliminata",
      description: "L'attività è stata eliminata con successo",
    });
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      setTasks(prev => prev.map(task => 
        task.id === taskData.id ? taskData : task
      ));
      toast({
        title: "Attività aggiornata",
        description: "Le modifiche sono state salvate con successo",
      });
    } else {
      const newTask = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks(prev => [...prev, newTask]);
      toast({
        title: "Attività creata",
        description: "La nuova attività è stata creata con successo",
      });
    }
    setIsDialogOpen(false);
  };

  const completeTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'completed',
            completedAt: new Date()
          } 
        : task
    ));
    toast({
      title: "Attività completata",
      description: "L'attività è stata marcata come completata",
    });
  };

  const filteredTasks = tasks.filter(task => 
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeTasks = filteredTasks.filter(task => task.status !== 'completed');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed')
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Attività</h1>
        <Button onClick={() => {
          setSelectedTask(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Nuova Attività
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Cerca attività..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-6">
        {/* Attività Attive */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeTasks.map((task) => (
            <ContentCard
              key={task.id}
              title={task.title}
              description={task.description}
              metadata={[
                { 
                  icon: Calendar, 
                  content: new Date(task.dueDate).toLocaleDateString() 
                },
                { 
                  icon: User, 
                  content: task.assignedTo 
                }
              ]}
              rightAction={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => completeTask(task.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              }
              onDelete={() => handleDeleteTask(task)}
              actions={[
                {
                  label: "Modifica",
                  onClick: () => {
                    setSelectedTask(task);
                    setIsDialogOpen(true);
                  }
                }
              ]}
              className={task.status === 'completed' ? 'opacity-60' : ''}
            />
          ))}
        </div>

        {/* Attività Completate */}
        {completedTasks.length > 0 && (
          <Collapsible open={isCompletedOpen} onOpenChange={setIsCompletedOpen}>
            <div className="border-t pt-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex justify-between items-center p-2">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {isCompletedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    Attività Completate ({completedTasks.length})
                  </span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                  {completedTasks.map((task) => (
                    <ContentCard
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      metadata={[
                        { 
                          icon: Calendar, 
                          content: `Completata il ${new Date(task.completedAt).toLocaleDateString()}` 
                        },
                        { 
                          icon: User, 
                          content: task.assignedTo 
                        }
                      ]}
                      onDelete={() => handleDeleteTask(task)}
                      className="opacity-60"
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}
      </div>

      <TaskDialog
        task={selectedTask}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveTask}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. L'attività verrà eliminata permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
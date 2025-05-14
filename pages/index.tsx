import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Todo {
  id: number;
  task: string;
  is_complete: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setTodos(data || []);
      }
      setLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            할 일 목록 (Supabase 연동)
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>완료 여부</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell>{todo.id}</TableCell>
                      <TableCell>{todo.task}</TableCell>
                      <TableCell>
                        {todo.is_complete ? '완료' : '미완료'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest text-neon border-l-4 border-neon pl-4">Todos</h1>
      <ul className="space-y-4">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded hover:border-neon transition-colors">
              {todo.name}
            </li>
          ))
        ) : (
          <li className="text-zinc-600 italic">No todos found. Create the 'todos' table in Supabase to see them here.</li>
        )}
      </ul>
    </div>
  )
}

// Importar las funciones y librerías necesarias
import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Definir la tienda "useTaskStore" utilizando el Composition API de Pinia
export const useTaskStore = defineStore("tasks", () => {
  // Declarar una variable reactiva para almacenar las tareas
  const tasksArr = ref([]);

  // Función para obtener las tareas desde Supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
  };

  // Función para añadir una nueva tarea a Supabase
  const addTask = async (title, description) => {
    // Obtener el ID del usuario actual desde la tienda de usuarios
    const userId = useUserStore().user.id;

    // Insertar la nueva tarea en la tabla "tasks" de Supabase
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: userId,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);

    // Volver a obtener las tareas actualizadas después de añadir una nueva tarea
    await fetchTasks();
  };

  // Función para borrar una tarea de Supabase
  const deleteTask = async (id) => {
    // Eliminar la tarea que coincida con el ID proporcionado desde la tabla "tasks" de Supabase
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });

    // Volver a obtener las tareas actualizadas después de eliminar una tarea
    await fetchTasks();
  };

  // Función para actualizar una tarea en Supabase
  const updateTask = async (id, title, description) => {
    // Actualizar la tarea que coincida con el ID proporcionado en la tabla "tasks" de Supabase
    const { data, error } = await supabase
      .from("tasks")
      .update([
        {
          title: title,
          description: description,
        },
      ])
      .eq("id", id);

    // Si ocurre un error durante la actualización, mostrarlo en la consola
    if (error) {
      console.error(error);
      return;
    }

    // Volver a obtener las tareas actualizadas después de actualizar una tarea
    await fetchTasks();
  };

  // Función para marcar una tarea como completa o incompleta en Supabase
  const completeTask = async (id, booleanValue) => {
    // Actualizar el campo "is_complete" de la tarea que coincida con el ID proporcionado en la tabla "tasks" de Supabase
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_complete: booleanValue })
      .eq('id', id);

    // Si ocurre un error durante la actualización, mostrarlo en la consola
    if (error) {
      console.error(error);
      return;
    }

    // Volver a obtener las tareas actualizadas después de marcar una tarea como completa o incompleta
    await fetchTasks();
  };

  // Retornar las funciones y variables reactivas que estarán disponibles en la tienda
  return { tasksArr, fetchTasks, addTask, deleteTask, updateTask, completeTask };
});
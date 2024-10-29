import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as { 
      id: string, 
      nombre: string, 
      tareas: { id: string; nombre: string; completada: boolean }[], 
      progreso: number 
    }[],
  }),
  actions: {
    agregarProyecto(nombreProyecto: string) {
      const proyecto = { 
        id: Date.now().toString(), 
        nombre: nombreProyecto, 
        tareas: [], 
        progreso: 0 
      };
      this.proyectos.push(proyecto);
    },
    agregarTarea(idProyecto: string, nombreTarea: string) {
      const proyecto = this.proyectos.find(proyecto => proyecto.id === idProyecto);
      if (proyecto && proyecto.tareas.length < 10) { 
        proyecto.tareas.push({
          id: Date.now().toString(),
          nombre: nombreTarea,
          completada: false,
        });
      }
    },
    actualizarProgreso(idProyecto: string) {
      const proyecto = this.proyectos.find(proyecto => proyecto.id === idProyecto);
      if (proyecto) {
        const tareasCompletadas = proyecto.tareas.filter(tarea => tarea.completada).length;
        proyecto.progreso = Math.min(tareasCompletadas * 10, 100); 
      }
    },
    marcarTarea(idProyecto: string, idTarea: string, completada: boolean) {
      const proyecto = this.proyectos.find(proyecto => proyecto.id === idProyecto);
      if (proyecto) {
        const tarea = proyecto.tareas.find(t => t.id === idTarea);
        if (tarea) {
          tarea.completada = completada;
          this.actualizarProgreso(idProyecto);
        }
      }
    },
    eliminar(idProyecto: string, idTarea: string) {
      const proyecto = this.proyectos.find(proyecto => proyecto.id === idProyecto);
      if (proyecto) {
        proyecto.tareas = proyecto.tareas.filter(tarea => tarea.id !== idTarea);
        this.actualizarProgreso(idProyecto); // Actualizar el progreso después de eliminar
      }
    },
    editar(idProyecto: string, idTarea:string, nuevonombre:string){
      const proyecto = this.proyectos.find(proyecto => proyecto.id === idProyecto)
      const tarea = proyecto?.tareas.find(tarea => tarea.id === idTarea)
      if(tarea) tarea.nombre  = nuevonombre;
    }
  }
}); 

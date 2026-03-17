package EMS.backend.service;

import EMS.backend.dto.TaskDTO;
import EMS.backend.entity.Task;
import java.util.List;

public interface TaskService {
    Task createTask(TaskDTO taskDTO);
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    Task updateTask(Long id, TaskDTO taskDTO);
    void deleteTask(Long id);
    List<Task> getTasksByUserId(Long userId);
    Task completeTask(Long id);
}

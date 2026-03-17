package EMS.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Long assignedToId;
    private LocalDateTime dueDate;
    private boolean completed;
    private LocalDateTime createdAt;
}

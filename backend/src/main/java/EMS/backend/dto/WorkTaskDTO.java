package EMS.backend.dto;

import lombok.Data;

@Data
public class WorkTaskDTO {
    private String title;
    private String description;
    private Long assignedToId;
}

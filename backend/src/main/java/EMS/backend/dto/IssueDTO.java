package EMS.backend.dto;

import lombok.Data;

@Data
public class IssueDTO {
    private String title;
    private String description;
    private Long assignedToId; // Admin, HR, or Manager User ID
}
